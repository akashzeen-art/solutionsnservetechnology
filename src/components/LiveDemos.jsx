import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Mail, PhoneCall, PhoneMissed, PhoneOff, RotateCcw, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { findCategory } from '../data/solutions.js'
import useInView, { usePrefersReducedMotion } from '../hooks/useInView.js'

function useLoop(length, interval, active) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setStep((s) => (s + 1) % length), interval)
    return () => clearInterval(id)
  }, [length, interval, active])

  return step
}

function useTween(target, duration = 900) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)

  useEffect(() => {
    const from = fromRef.current
    if (target <= from) {
      fromRef.current = target
      setValue(target)
      return
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration))
      const next = from + (target - from) * (1 - (1 - t) ** 3)
      fromRef.current = next
      setValue(next)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

function Phone({ children }) {
  return (
    <div className="phone">
      <span className="phone-notch" />
      <div className="phone-screen">{children}</div>
    </div>
  )
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

function UssdScene({ step }) {
  if (step <= 3) {
    const code = ['', '*1', '*123#', '*123#'][step]
    const pressed = { 1: '1', 2: '#' }[step]
    return (
      <Phone>
        <div className="ussd-dial">
          <span className="ussd-dial-label">{step === 3 ? 'Sending request…' : 'Dial'}</span>
          <strong className="ussd-dial-code">
            {code}
            <i className="caret" />
          </strong>
          {step === 3 ? (
            <span className="demo-spinner" />
          ) : (
            <div className="keypad">
              {KEYS.map((key) => (
                <span key={key} className={key === pressed ? 'is-pressed' : undefined}>
                  {key}
                </span>
              ))}
            </div>
          )}
        </div>
      </Phone>
    )
  }

  if (step <= 5) {
    return (
      <Phone>
        <div className="ussd-popup" key="menu">
          <p className="ussd-popup-title">nSERVE Offers</p>
          <ol>
            <li>Data packs</li>
            <li className={step === 5 ? 'is-picked' : undefined}>Weekend offer</li>
            <li>Check balance</li>
          </ol>
          <div className="ussd-input">
            {step === 5 ? '2' : ''}
            <i className="caret" />
          </div>
          <div className="ussd-actions">
            <span>Cancel</span>
            <span className={step === 5 ? 'is-pressed' : undefined}>Send</span>
          </div>
        </div>
      </Phone>
    )
  }

  return (
    <Phone>
      <div className="ussd-popup ussd-popup--done" key="done">
        <span className="demo-check">
          <Check size={22} strokeWidth={3} />
        </span>
        <p className="ussd-popup-title">Weekend offer activated</p>
        <p className="ussd-popup-sub">5 GB data · valid 2 days</p>
      </div>
    </Phone>
  )
}

function McnScene({ step }) {
  if (step <= 1) {
    const unreachable = step === 1
    return (
      <Phone>
        <div className={`call-screen${unreachable ? ' is-off' : ''}`} key={unreachable ? 'off' : 'on'}>
          <span className="call-avatar">
            {unreachable ? null : <i className="call-ring" />}
            {unreachable ? null : <i className="call-ring call-ring--late" />}P
          </span>
          <strong>Priya</strong>
          <span className="call-status">{unreachable ? 'Subscriber unreachable' : 'Calling…'}</span>
          <span className="call-end">
            {unreachable ? <PhoneOff size={18} /> : <PhoneCall size={18} />}
          </span>
        </div>
      </Phone>
    )
  }

  return (
    <Phone>
      <div className="lock-screen">
        <span className="lock-time">10:42</span>
        <span className="lock-date">Tuesday, 6 October</span>
        <div className="lock-notes">
          <div className="lock-note" key="mcn">
            <span className="lock-note-icon">
              <PhoneMissed size={14} />
            </span>
            <div>
              <strong>Missed call alert</strong>
              <p>Priya called you at 10:41 AM</p>
            </div>
          </div>
          {step >= 3 ? (
            <div className="lock-note" key="cmb">
              <span className="lock-note-icon">
                <RotateCcw size={14} />
              </span>
              <div>
                <strong>Call Me Back</strong>
                <p>Priya requested a call back</p>
              </div>
            </div>
          ) : null}
        </div>
        {step >= 4 ? (
          <span className="lock-action">
            <PhoneCall size={14} /> Call back
          </span>
        ) : null}
      </div>
    </Phone>
  )
}

const IVR_LINES = [
  { from: 'ivr', text: 'Welcome to nSERVE Care.' },
  { from: 'ivr', text: 'Press 1 for balance, 2 for offers.' },
  { from: 'user', text: '1' },
  { from: 'ivr', text: 'Your balance is ₹245.50' },
]

function IvrScene({ step }) {
  return (
    <Phone>
      <div className="ivr-screen">
        <div className="ivr-head">
          <span className="ivr-dot" />
          <strong>nSERVE Care</strong>
          <span>00:{String(step * 4).padStart(2, '0')}</span>
        </div>
        <div className="ivr-wave">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ '--b': i }} />
          ))}
        </div>
        <div className="ivr-chat">
          {step === 0 ? <p className="ivr-connecting">Connecting call…</p> : null}
          {IVR_LINES.slice(0, step).map((line) => (
            <p key={line.text} className={`ivr-bubble is-${line.from}`}>
              {line.from === 'user' ? <span className="ivr-key">{line.text}</span> : line.text}
            </p>
          ))}
        </div>
      </div>
    </Phone>
  )
}

const DELIVERED = [0, 16420, 33180, 50000, 50000]

function BulkScene({ step }) {
  const delivered = useTween(DELIVERED[step])
  const lit = Math.min(12, step * 4)
  const sending = step >= 1 && step <= 3

  return (
    <div className="bulk">
      <div className="bulk-campaign">
        <span className="bulk-campaign-icon">
          <Mail size={16} />
        </span>
        <div>
          <strong>Festive Sale campaign</strong>
          <p>“30% off today only — shop now!”</p>
        </div>
      </div>

      <div className={`bulk-beam${sending ? ' is-sending' : ''}`}>
        <i />
        <i />
        <i />
      </div>

      <div className="bulk-grid">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={i < lit ? 'is-lit' : undefined} style={{ '--n': i % 4 }}>
            <Smartphone size={18} />
          </span>
        ))}
      </div>

      <div className="bulk-meter">
        <div className="bulk-meter-row">
          <span>{step >= 4 ? 'Campaign delivered' : step === 0 ? 'Ready to send' : 'Delivering…'}</span>
          <strong>{Math.round(delivered).toLocaleString('en-US')}</strong>
        </div>
        <div className="bulk-bar">
          <span style={{ width: `${(delivered / 50000) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

const demos = [
  {
    categoryId: 'offers-enablement',
    product: 'USSD',
    title: 'Interactive menus on any phone',
    text: 'A subscriber dials *123#, browses offers and activates one in seconds — no app, no internet.',
    Scene: UssdScene,
    steps: 7,
    interval: 1300,
  },
  {
    categoryId: 'core-vas',
    product: 'MCN & CMB',
    title: 'Never miss a call again',
    text: 'When a subscriber is unreachable, they get an instant missed call alert and a call-back request.',
    Scene: McnScene,
    steps: 5,
    interval: 1500,
  },
  {
    categoryId: 'vas-digital',
    product: 'Cloud IVR',
    title: 'Self-service voice journeys',
    text: 'Callers move through voice menus with keypad input and get answers instantly, 24/7.',
    Scene: IvrScene,
    steps: 5,
    interval: 1500,
  },
  {
    categoryId: 'mobile-advertisement',
    product: 'Bulk SMS',
    title: 'One campaign, every subscriber',
    text: 'Push a personalised offer to thousands of users and watch delivery happen in real time.',
    Scene: BulkScene,
    steps: 5,
    interval: 1400,
  },
]

function DemoCard({ demo, index }) {
  const category = findCategory(demo.categoryId)
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView({ threshold: 0.3 })
  const loopStep = useLoop(demo.steps, demo.interval, inView && !reduced)
  const step = reduced ? demo.steps - 1 : loopStep
  const Icon = category.icon
  const { Scene } = demo

  return (
    <article ref={ref} className="live-card" data-reveal style={{ '--accent': category.accent, '--i': index }}>
      <div className="live-stage" aria-hidden="true">
        <span className="live-badge">
          <i /> Live demo
        </span>
        <Scene step={step} />
        <div className="live-steps">
          {Array.from({ length: demo.steps }, (_, i) => (
            <i key={i} className={i === step ? 'is-active' : i < step ? 'is-done' : undefined} />
          ))}
        </div>
      </div>
      <div className="live-body">
        <p className="live-family">
          <Icon size={14} strokeWidth={2.2} />
          {category.title} · {demo.product}
        </p>
        <h3>{demo.title}</h3>
        <p>{demo.text}</p>
        <Link to={`/${category.id}`} className="live-link">
          Explore {category.title}
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  )
}

export default function LiveDemos() {
  return (
    <section className="live" aria-labelledby="live-title">
      <div className="live-head" data-reveal>
        <p className="families-kicker">See it in action</p>
        <h2 id="live-title">Watch nSERVE at work on the network</h2>
        <p>Real subscriber journeys powered by our platforms — from a USSD menu to a nationwide SMS campaign.</p>
      </div>
      <div className="live-grid">
        {demos.map((demo, index) => (
          <DemoCard key={demo.categoryId} demo={demo} index={index} />
        ))}
      </div>
    </section>
  )
}
