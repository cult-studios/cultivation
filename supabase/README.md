# Cultivation newsletter — auto-announce setup

This adds a one-click "📣 email this entry" button to the private journal editor.
When you click it, a Supabase Edge Function emails every subscriber (via Resend) a
link that opens straight to that journal entry. Subscribers get a working unsubscribe link.

**Where this folder lives:** put `supabase/` at the ROOT of your git repo (next to
`deploy/`), and run the `supabase` CLI from there. The functions are NOT part of the
static site — they run on Supabase, not your web host.

---

## One-time setup

### 1. Database
In the Supabase SQL Editor, run `migrations/0001_newsletter.sql`
(adds `unsubscribed` + `token` columns to your existing `signups` table).

### 2. Install + link the CLI
```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR-PROJECT-REF      # the ref is in your project URL
```

### 3. Set the secrets
```bash
supabase secrets set RESEND_API_KEY="re_xxx"
supabase secrets set RESEND_FROM="cultivation <hello@yourdomain.com>"   # a domain verified in Resend
supabase secrets set ANNOUNCE_SECRET="$(openssl rand -hex 24)"          # copy this value, you need it in step 5
supabase secrets set SITE_URL="https://your-live-site.com"              # no trailing slash
```
(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically — don't set them.)

### 4. Deploy the functions
```bash
supabase functions deploy announce
supabase functions deploy unsubscribe
```
`config.toml` already turns off the default JWT gate for both (announce uses the
shared secret instead; unsubscribe is a public link).

### 5. Point the editor at it
In `ui_kits/cultivation/journal-editor.html`, near the top of the script
(`// ===== CONFIG =====`), set:
```js
const ANNOUNCE_URL    = "https://YOUR-PROJECT.supabase.co/functions/v1/announce";
const ANNOUNCE_SECRET = "<the same value you set for ANNOUNCE_SECRET in step 3>";
```

---

## Publishing flow (every new entry)

1. Write the entry in the journal editor, **Download entries.js**, drop it into the
   site, and **push to your live host.** (The email links to the live entry, so it
   must be live first.)
2. Back in the editor, select that entry and click **📣 email this entry** → confirm.
3. You'll get a toast: "sent to N subscriber(s)".

## Notes & safety
- The `ANNOUNCE_SECRET` lives in `journal-editor.html`. Keep that file **out of your
  public deploy** (it already is — `deploy/` doesn't include it). Anyone with the URL
  + secret could blast your list.
- Deliverability depends on a **verified sending domain** in Resend. The default
  `onboarding@resend.dev` only sends to your own address — fine for testing, not launch.
- Test first: add yourself as a subscriber, publish a throwaway entry, announce it,
  confirm the email + the unsubscribe link both work.
- Resend free tier is ~3k emails/month, 100 messages per batch (the function chunks
  automatically for bigger lists).
