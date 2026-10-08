import { Cloud, Hash, Megaphone, MessageSquare, Music, PhoneCall, Smartphone, Zap } from 'lucide-react'
import useParallax from '../hooks/useParallax.js'

const rows = [
  ['USSD', 'SMSC', 'Cloud IVR', 'CRBT', 'Bulk SMS', 'LBS', 'DMC'],
  ['Beep Call', 'OBD', 'USSD Push', 'Mobicharge', 'Balance +', 'SDP', 'WAVE'],
]

const bubbles = [
  { icon: Hash, x: '6%', y: '18%', depth: 1.2 },
  { icon: MessageSquare, x: '16%', y: '72%', depth: 0.6 },
  { icon: PhoneCall, x: '30%', y: '8%', depth: 0.9 },
  { icon: Music, x: '70%', y: '80%', depth: 1.1 },
  { icon: Megaphone, x: '82%', y: '14%', depth: 0.7 },
  { icon: Cloud, x: '92%', y: '58%', depth: 1.4 },
  { icon: Smartphone, x: '52%', y: '88%', depth: 0.5 },
  { icon: Zap, x: '68%', y: '6%', depth: 1.3 },
]

export default function ParallaxBand() {
  const ref = useParallax()

  return (
    <section ref={ref} className="pband" aria-labelledby="pband-title">
      <div className="pband-bg" aria-hidden="true" />

      <div className="pband-words" aria-hidden="true">
        {rows.map((row, index) => (
          <p key={index} className={`pband-row${index % 2 ? ' is-reverse' : ''}`}>
            {[...row, ...row].map((word, wordIndex) => (
              <span key={wordIndex}>{word}</span>
            ))}
          </p>
        ))}
      </div>

      <div className="pband-bubbles" aria-hidden="true">
        {bubbles.map(({ icon: Icon, x, y, depth }) => (
          <span key={`${x}-${y}`} className="pband-bubble" style={{ left: x, top: y, '--depth': depth }}>
            <Icon size={22} />
          </span>
        ))}
      </div>

      <div className="pband-content" data-reveal="zoom">
        <p className="pband-kicker">One partner, every channel</p>
        <h2 id="pband-title">Reach every subscriber, on any phone and any network.</h2>
        <p>
          USSD, messaging, voice, ringback tones and mobile advertising working together on one
          carrier-grade platform.
        </p>
      </div>
    </section>
  )
}
