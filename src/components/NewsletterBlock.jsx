'use client'
import { useState } from 'react'

export default function NewsletterBlock({ source = 'article', accent = '#9E2B1E', compact = false, heading, sub }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | busy | done | error
  const [msg, setMsg] = useState('')

  async function submit() {
    if (state === 'busy' || state === 'done') return
    setState('busy')
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const d = await r.json()
      if (d.ok) { setState('done') } else { setState('error'); setMsg(d.error || 'Something went wrong.') }
    } catch { setState('error'); setMsg('Something went wrong — please try again.') }
  }

  return (
    <div className={`rounded-2xl ${compact ? 'p-5' : 'p-6 md:p-8'}`} style={{ background: '#FAF6EE', border: '1px solid #EFE7D8' }}>
      <div className="font-sans text-[11px] font-bold uppercase tracking-[.12em]" style={{ color: accent }}>
        The Kumaoni Calendar
      </div>
      <h3 className="mt-2 font-head text-xl font-extrabold leading-snug text-[#26231c] md:text-2xl">
        {heading || 'Never miss a festival of the hills'}
      </h3>
      <p className="mt-2 max-w-[52ch] font-sans text-[14px] leading-relaxed text-[#5c584d]">
        {sub || 'One short email before each Kumaoni festival — the date, the rituals, the Aipan to draw. No noise, ever.'}
      </p>
      {state === 'done' ? (
        <p className="mt-4 font-sans text-[14px] font-semibold" style={{ color: accent }}>
          You&rsquo;re on the list. See you before the next festival. 🌱
        </p>
      ) : (
        <div className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="you@example.com" aria-label="Email address"
            className="w-full rounded-full border border-[#e3dccb] bg-white px-4 py-2.5 font-sans text-[14px] outline-none focus:border-[#c9b98f]"
          />
          <button onClick={submit} disabled={state === 'busy'}
            className="shrink-0 rounded-full px-5 py-2.5 font-sans text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: accent }}>
            {state === 'busy' ? 'Adding…' : 'Sign me up'}
          </button>
        </div>
      )}
      {state === 'error' && <p className="mt-2 font-sans text-[13px] text-[#a33]">{msg}</p>}
    </div>
  )
}
