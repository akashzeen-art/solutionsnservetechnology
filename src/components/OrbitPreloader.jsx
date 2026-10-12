import { useCallback, useEffect, useRef, useState } from 'react'
import { categories } from '../data/solutions.js'

/** When each solution family connects to the hub, in ms from the start. */
const STAGE_AT = [800, 1800, 2800, 3800]
const FILL_MS = 4800
/** The finished "all connected" state holds until here before the site appears. */
const STORY_MS = 6400
const REDUCED_STORY_MS = 1800
const SAFETY_MS = 11000
const FADE_MS = 600

/** Diagonal corners keep each family's label clear of the hub and of the screen edges. */
const ANGLES = [-135, -45, 45, 135]
const RADIUS = 40

const nodes = categories.map((category, i) => {
  const rad = (ANGLES[i] * Math.PI) / 180
  return {
    ...category,
    x: 50 + RADIUS * Math.cos(rad),
    y: 50 + RADIUS * Math.sin(rad),
    lx: RADIUS * Math.cos(rad),
    ly: RADIUS * Math.sin(rad),
    top: Math.sin(rad) < 0,
  }
})

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function OrbitPreloader({ onReveal, onDone }) {
  const [onScreen, setOnScreen] = useState(() => document.visibilityState === 'visible')
  const [progress, setProgress] = useState(0)
  const [connected, setConnected] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const leavingRef = useRef(false)
  const done = progress >= 100

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
    const fillMs = reduced ? REDUCED_STORY_MS : FILL_MS
    const storyMs = reduced ? REDUCED_STORY_MS : STORY_MS

    let frame
    const start = performance.now()
    const tick = (now) => {
      // rAF timestamps can be slightly earlier than `start`, so clamp at 0 too.
      const elapsed = Math.max(0, now - start)
      const t = Math.min(1, elapsed / fillMs)
      setProgress(Math.round((1 - (1 - t) ** 2) * 100))
      setConnected(reduced ? nodes.length : STAGE_AT.filter((at) => elapsed >= at).length)
      if (t < 1) frame = requestAnimationFrame(tick)
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
    const story = window.setTimeout(() => {
      storyDone = true
      finish()
    }, storyMs)
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

  if (!onScreen) return <div className="slp" aria-hidden="true" />

  const current = nodes[Math.max(0, connected - 1)]
  const statusKey = done ? 'ready' : connected === 0 ? 'boot' : current.id

  return (
    <div
      className={`slp${leaving ? ' is-leaving' : ''}`}
      role="status"
      aria-label="Loading nSERVE Solutions"
      aria-busy={!done}
    >
      <div className="slp-grid" aria-hidden="true" />

      <button type="button" className="slp-skip" onClick={leave}>
        Skip
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5.5v13l9-6.5-9-6.5Zm10 0v13h3v-13h-3Z" />
        </svg>
      </button>

      <div className="slp-brand">
        <p className="slp-kicker">
          <span className="slp-kicker-dot" />
          nSERVE Solutions
        </p>
        <p className="slp-headline">
          Telecom solutions that <span>connect, engage</span> &amp; grow.
        </p>
      </div>

      <div className="slp-orbit">
        <svg className="slp-links" viewBox="-50 -50 100 100" aria-hidden="true">
          <circle className="slp-ring" r={RADIUS} />
          {nodes.map((node, i) => (
            <g key={node.id} className={`slp-link${i < connected ? ' is-on' : ''}`} style={{ '--accent': node.accent }}>
              <line className="slp-link-line" x2={node.lx} y2={node.ly} pathLength="1" />
              <line className="slp-link-packet" x2={node.lx} y2={node.ly} pathLength="100" />
            </g>
          ))}
        </svg>

        <div className={`slp-hub${done ? ' is-ready' : ''}`}>
          <span className="slp-ripple" aria-hidden="true" />
          <span className="slp-ripple slp-ripple--late" aria-hidden="true" />
          <img src="/nservelogo.png" alt="" />
        </div>

        {nodes.map((node, i) => {
          const Icon = node.icon
          return (
            <div
              key={node.id}
              className={`slp-node${node.top ? ' slp-node--top' : ''}${i < connected ? ' is-on' : ''}`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, '--accent': node.accent }}
            >
              <span className="slp-node-icon">
                <Icon size={22} strokeWidth={2.2} />
              </span>
              <span className="slp-node-text">
                <b>{node.title}</b>
                <small className="slp-node-items">{node.items.map((item) => item.name).join(' · ')}</small>
                <small className="slp-node-count">{node.items.length} solutions</small>
              </span>
            </div>
          )
        })}
      </div>

      <div className="slp-foot">
        <div className="slp-meter">
          <span key={statusKey} className="slp-status">
            {done ? (
              'All solutions connected'
            ) : connected === 0 ? (
              'Powering up the network'
            ) : (
              <>
                <em>{String(connected).padStart(2, '0')} / {String(nodes.length).padStart(2, '0')}</em>
                Connecting {current.title}
              </>
            )}
          </span>
          <span className="slp-percent">{progress}%</span>
        </div>
        <div className="slp-bar" aria-hidden="true">
          <div className="slp-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  )
}
