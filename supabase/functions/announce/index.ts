// ============================================================
// Cultivation — "announce a journal entry" Edge Function
// Emails every non-unsubscribed subscriber via Resend.
//
// Auth: the caller (your private journal-editor page) must send
//   Authorization: Bearer <ANNOUNCE_SECRET>
//
// Required secrets (set with `supabase secrets set ...`):
//   RESEND_API_KEY            your Resend API key
//   RESEND_FROM               e.g. "cultivation <hello@yourdomain.com>" (verified in Resend)
//   ANNOUNCE_SECRET           a long random string; must match the editor page
//   SITE_URL                  e.g. "https://your-live-site.com" (no trailing slash)
// Auto-provided by Supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// ============================================================

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "content-type": "application/json" } });

const esc = (s: string) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function emailHtml(o: { title: string; sub: string; no: string; entryUrl: string; unsubUrl: string }) {
  return `<!doctype html><html><body style="margin:0;background:#0a0f0c;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f0c;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#17231d;border:1px solid rgba(124,176,144,0.2);border-radius:16px;overflow:hidden;">
        <tr><td style="padding:30px 34px 8px;">
          <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6fc6c4;">cultivation &middot; dev journal &middot; no. ${esc(o.no)}</div>
        </td></tr>
        <tr><td style="padding:4px 34px 0;">
          <h1 style="margin:6px 0 4px;font-size:26px;line-height:1.15;color:#f0ead6;font-weight:normal;">${esc(o.title)}</h1>
          <div style="font-family:'Brush Script MT',cursive;font-size:19px;color:#e8a84d;">${esc(o.sub)}</div>
        </td></tr>
        <tr><td style="padding:22px 34px 30px;">
          <p style="margin:0 0 22px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#c2ccbc;">a new entry just sprouted in the garden. give it a read whenever you've got a quiet minute.</p>
          <a href="${o.entryUrl}" style="display:inline-block;background:#3f9068;color:#0e1611;font-family:Helvetica,Arial,sans-serif;font-weight:bold;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:999px;">read the entry &rarr;</a>
        </td></tr>
        <tr><td style="padding:18px 34px 26px;border-top:1px solid rgba(124,176,144,0.14);">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#869184;">
            you're getting this because you signed up at cultivation.<br>
            Cult Studios &middot; grow responsibly &middot;
            <a href="${o.unsubUrl}" style="color:#b478e0;text-decoration:underline;">unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);

  // shared-secret auth (the editor sends this)
  const expected = `Bearer ${Deno.env.get("ANNOUNCE_SECRET")}`;
  if ((req.headers.get("authorization") || "") !== expected) return json({ error: "unauthorized" }, 401);

  const { no, title, sub } = await req.json().catch(() => ({}));
  if (!title || !no) return json({ error: "missing 'no' or 'title'" }, 400);

  const SITE_URL = (Deno.env.get("SITE_URL") || "").replace(/\/$/, "");
  const FROM = Deno.env.get("RESEND_FROM") || "cultivation <onboarding@resend.dev>";
  const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_KEY) return json({ error: "RESEND_API_KEY not set" }, 500);

  const fnBase = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;
  const SB_URL = Deno.env.get("SUPABASE_URL")!;
  const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  // read subscribers via PostgREST (service_role bypasses RLS)
  const subRes = await fetch(
    `${SB_URL}/rest/v1/signups?select=email,token&unsubscribed=eq.false`,
    { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
  );
  if (!subRes.ok) return json({ error: `read failed: ${subRes.status} ${await subRes.text()}` }, 500);
  const subs: { email: string; token: string }[] = await subRes.json();
  if (!subs || subs.length === 0) return json({ sent: 0, note: "no subscribers yet" });

  const entryUrl = `${SITE_URL}/journal.html?entry=${encodeURIComponent(no)}`;
  let sent = 0;
  const errors: string[] = [];

  // Resend batch endpoint accepts up to 100 messages per call
  for (let i = 0; i < subs.length; i += 100) {
    const chunk = subs.slice(i, i + 100);
    const batch = chunk.map((s) => ({
      from: FROM,
      to: [s.email],
      subject: `new journal entry: ${title}`,
      html: emailHtml({ title, sub: sub || "", no, entryUrl, unsubUrl: `${fnBase}/unsubscribe?token=${s.token}` }),
    }));
    const r = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "content-type": "application/json" },
      body: JSON.stringify(batch),
    });
    if (r.ok) {
      const d = await r.json().catch(() => ({}));
      sent += Array.isArray(d?.data) ? d.data.length : chunk.length;
    } else {
      errors.push(`chunk ${i / 100}: ${r.status} ${await r.text()}`);
    }
  }

  return json({ sent, total: subs.length, errors: errors.length ? errors : undefined });
});
