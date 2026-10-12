import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Phone } from 'lucide-react'
import { categories } from '../data/solutions.js'

/** Story beats, in ms from the start: dial the code, run it, then tick off each family. */
const USSD_CODE = '*123#'
const TYPE_AT = 700
const TYPE_STEP = 170
const DIAL_AT = 1750
const MENU_AT = 2450
const STAGE_AT = [2950, 3650, 4350, 5050]
const FILL_MS = 5400
/** The finished menu holds until here before the site appears. */
const STORY_MS = 6800
const REDUCED_STORY_MS = 1800
const SAFETY_MS = 11000
const FADE_MS = 700

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

const products = categories.flatMap((category) =>
  category.items.map((item) => ({ ...item, accent: category.accent })),
)

/** Chat bubbles beside the phone on wide screens: three a side. */
const BUBBLES = ['ussd', 'smsc', 'lbs', 'crbt', 'cloud-ivr', 'bulk-sms']
  .map((id) => products.find((item) => item.id === id))
  .filter(Boolean)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Preloader({ onReveal, onDone }) {
  const [onScreen, setOnScreen] = useState(() => document.visibilityState === 'visible')
  const [clock, setClock] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const leavingRef = useRef(false)

  const leave = useCallback(() => {
    if (leavingRef.current) return
    leavingRef.current = true
    setLeaving(true)
    onReveal?.()
  }, [onReveal])

  // Safari can load a page before it is shown (top-hit preloading, background tabs);
  // the story must not start until then or it finishes unseen.
  useEffect(() => {
    if (onScreen) return undefined
    const onVisibility = () => {
      if (document.visibilityState === 'visible') setOnScreen(true)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [onScreen])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!onScreen) return undefined
    const reduced = prefersReducedMotion()

    let frame
    const start = performance.now()
    const tick = (now) => {
      // rAF timestamps can be slightly earlier than `start`, so clamp at 0 too.
      const elapsed = reduced ? STORY_MS : Math.max(0, now - start)
      setClock(elapsed)
      if (elapsed < FILL_MS) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    let storyDone = false
    let pageLoaded = false
    const finish = () => {
      if (storyDone && pageLoaded) leave()
    }
    const windowLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
    const fontsReady = document.fonts?.ready?.catch(() => {}) ?? Promise.resolve()
    let cancelled = false
    Promise.all([windowLoaded, fontsReady]).then(() => {
      if (cancelled) return
      pageLoaded = true
      finish()
    })
    const story = window.setTimeout(
      () => {
        storyDone = true
        finish()
      },
      reduced ? REDUCED_STORY_MS : STORY_MS,
    )
    const safety = window.setTimeout(leave, SAFETY_MS)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.clearTimeout(story)
      window.clearTimeout(safety)
    }
  }, [onScreen, leave])

  useEffect(() => {
    if (!leaving) return undefined
    const id = window.setTimeout(() => {
      document.body.style.overflow = ''
      onDone?.()
    }, FADE_MS)
    return () => window.clearTimeout(id)
  }, [leaving, onDone])

  if (!onScreen) return <div className="spp" aria-hidden="true" />

  const t = Math.min(1, clock / FILL_MS)
  const progress = Math.round((1 - (1 - t) ** 2) * 100)
  const done = progress >= 100
  const typed = Math.max(0, Math.min(USSD_CODE.length, Math.floor((clock - TYPE_AT) / TYPE_STEP) + 1))
  const pressedKey = clock < DIAL_AT && typed > 0 ? USSD_CODE[typed - 1] : null
  const phase = clock < DIAL_AT ? 'dial' : clock < MENU_AT ? 'connecting' : 'menu'
  const connected = STAGE_AT.filter((at) => clock >= at).length
  const current = categories[Math.max(0, connected - 1)]

  let status
  if (done) status = 'All solutions ready'
  else if (phase === 'dial') status = 'Dialling into the nSERVE network'
  else if (connected === 0) status = 'Opening the solutions menu'
  else status = current.title

  return (
    <div
      className={`spp${leaving ? ' is-leaving' : ''}`}
      role="status"
      aria-label="Loading nSERVE Solutions"
      aria-busy={!done}
    >
      <div className="spp-glow" aria-hidden="true" />

      <button type="button" className="spp-skip" onClick={leave}>
        Skip
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5.5v13l9-6.5-9-6.5Zm10 0v13h3v-13h-3Z" />
        </svg>
      </button>

      <div className="spp-brand">
        <img src="/nservelogo.png" alt="" />
        <p className="spp-headline">
          Telecom solutions that <span>connect, engage</span> &amp; grow.
        </p>
      </div>

      <div className="spp-stage">
        {BUBBLES.map((item, i) => {
          const Icon = item.icon
          return (
            <span
              key={item.id}
              className={`spp-bubble spp-bubble--${i < 3 ? 'left' : 'right'}`}
              style={{ '--accent': item.accent, '--row': i % 3, '--delay': `${0.9 + (i % 3) * 0.5}s` }}
              aria-hidden="true"
            >
              <span className="spp-bubble-icon">
                <Icon size={16} strokeWidth={2.4} />
              </span>
              {item.name}
            </span>
          )
        })}

        <div className="spp-phone" aria-hidden="true">
          <div className="spp-phone-screen">
            <div className="spp-phone-status">
              <span>nSERVE</span>
              <span className="spp-signal">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>

            {phase === 'menu' ? (
              <div className="spp-ussd">
                <p className="spp-ussd-title">nSERVE Solutions</p>
                <ol className="spp-ussd-list">
                  {categories.map((category, i) => {
                    const Icon = category.icon
                    return (
                      <li
                        key={category.id}
                        className={i < connected ? 'is-on' : ''}
                        style={{ '--accent': category.accent }}
                      >
                        <span className="spp-ussd-num">{i + 1}</span>
                        <span className="spp-ussd-icon">
                          <Icon size={14} strokeWidth={2.4} />
                        </span>
                        <span className="spp-ussd-name">{category.title}</span>
                        <Check className="spp-ussd-check" size={14} strokeWidth={3} />
                      </li>
                    )
                  })}
                </ol>
                <p className={`spp-ussd-foot${done ? ' is-done' : ''}`}>
                  {done ? 'All solutions ready' : 'Connecting…'}
                </p>
              </div>
            ) : (
              <div className="spp-dial">
                <p className="spp-dial-code">
                  {USSD_CODE.slice(0, typed)}
                  <span className="spp-caret" />
                </p>
                <p className="spp-dial-state">
                  {phase === 'connecting' ? (
                    <>
                      <span className="spp-spinner" />
                      USSD code running…
                    </>
                  ) : (
                    'Dialling nSERVE'
                  )}
                </p>
                <div className="spp-keypad">
                  {KEYS.map((key) => (
                    <span key={key} className={key === pressedKey ? 'is-pressed' : ''}>
                      {key}
                    </span>
                  ))}
                </div>
                <span className={`spp-call${phase === 'connecting' ? ' is-calling' : ''}`}>
                  <Phone size={16} strokeWidth={2.4} />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="spp-foot">
        <div className="spp-ticker" aria-hidden="true">
          <div className="spp-ticker-track">
            {[...products, ...products].map((item, i) => (
              <span key={`${item.id}-${i}`} style={{ '--accent': item.accent }}>
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="spp-meter">
          <span key={status} className="spp-status">
            {!done && phase === 'menu' && connected > 0 && (
              <em>
                {String(connected).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
              </em>
            )}
            {status}
          </span>
          <span className="spp-percent">{progress}%</span>
        </div>
        <div className="spp-bar" aria-hidden="true">
          <div className="spp-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  )
}
