// Email capture endpoint.
// If RESEND_API_KEY (+ optional RESEND_AUDIENCE_ID) are set in Vercel env,
// contacts are stored in Resend. Without keys it still returns ok so the UI
// works — add the keys to start persisting signups.
export async function POST(req) {
  let body = {}
  try { body = await req.json() } catch {}
  const email = (body.email || '').trim().toLowerCase()
  const source = (body.source || 'article').slice(0, 40)
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  if (!valid) return Response.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 })

  const key = process.env.RESEND_API_KEY
  if (key) {
    try {
      const audienceId = process.env.RESEND_AUDIENCE_ID
      if (audienceId) {
        await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, unsubscribed: false }),
        })
      } else if (process.env.SUBSCRIBE_NOTIFY_TO) {
        // fallback: email each signup to the founder inbox
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Aipan House <onboarding@resend.dev>',
            to: process.env.SUBSCRIBE_NOTIFY_TO,
            subject: `New signup (${source}): ${email}`,
            text: `${email} signed up via ${source} at ${new Date().toISOString()}`,
          }),
        })
      }
    } catch (e) {
      console.error('subscribe error', e)
    }
  } else {
    console.log('SIGNUP (no RESEND_API_KEY set):', email, source)
  }
  return Response.json({ ok: true })
}
