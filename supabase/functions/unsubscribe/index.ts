// ============================================================
// Cultivation — unsubscribe Edge Function
// Public GET endpoint hit from the "unsubscribe" link in emails.
//   /functions/v1/unsubscribe?token=<uuid>
// Flips signups.unsubscribed = true for that token, shows a small page.
// Auto-provided by Supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// ============================================================

function page(heading: string, body: string) {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>cultivation</title></head>
    <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0e1611;font-family:Helvetica,Arial,sans-serif;color:#c2ccbc;">
      <div style="max-width:380px;text-align:center;padding:32px;">
        <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6fc6c4;margin-bottom:14px;">cultivation</div>
        <h1 style="font-family:Georgia,serif;font-weight:normal;color:#f0ead6;font-size:26px;margin:0 0 10px;">${heading}</h1>
        <p style="font-size:14px;line-height:1.6;margin:0;">${body}</p>
      </div>
    </body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

Deno.serve(async (req) => {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return page("invalid link", "this unsubscribe link is missing its token.");

  const SB_URL = Deno.env.get("SUPABASE_URL")!;
  const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const res = await fetch(
    `${SB_URL}/rest/v1/signups?token=eq.${encodeURIComponent(token)}`,
    {
      method: "PATCH",
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ unsubscribed: true }),
    },
  );
  if (!res.ok) return page("something went wrong", "try again in a bit, or just reply to the email and we'll take care of it.");

  return page("you're unsubscribed", "you won't get any more dispatches from the farm. take care &#9829;");
});
