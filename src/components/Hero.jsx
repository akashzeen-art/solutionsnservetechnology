import { Link } from 'react-router-dom'
import { categories } from '../data/solutions.js'

const floatingTags = [
  { id: 'ussd', x: '-4%', y: '-6%' },
  { id: 'crbt', x: '86%', y: '-6%' },
  { id: 'bulk-sms', x: '82%', y: '99%' },
  { id: 'cloud-ivr', x: '-8%', y: '99%' },
]

const allItems = categories.flatMap((category) =>
  category.items.map((item) => ({ ...item, accent: category.accent })),
)

export default function Hero() {
  const tags = floatingTags
    .map((tag) => ({ ...tag, item: allItems.find((item) => item.id === tag.id) }))
    .filter((tag) => tag.item)

  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy enter-stagger">
          <p className="hero-kicker">
            <span className="hero-kicker-dot" />
            nSERVE Solutions
          </p>
          <h1>
            Telecom solutions that <span className="hero-gradient">connect, engage</span> &amp; grow.
          </h1>
          <p className="hero-lead">
            From USSD and SMSC to Cloud IVR and mobile advertising — the network capabilities,
            value-added services and campaigns operators and enterprises need, in one place.
          </p>

          <div className="hero-chips">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link key={category.id} to={`/${category.id}`} style={{ '--accent': category.accent }}>
                  <Icon size={18} />
                  {category.title}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="hero-orbit">
          <div className="orbit-ring orbit-ring--outer" aria-hidden="true" />
          <div className="orbit-ring orbit-ring--inner" aria-hidden="true" />

          <div className="orbit-hub">
            <span className="orbit-ripple" aria-hidden="true" />
            <span className="orbit-ripple orbit-ripple--late" aria-hidden="true" />
            <img src="/nservelogo.png" alt="nSERVE" />
          </div>

          <div className="orbit-track">
            {categories.map((category, index) => (
              <span
                key={`spoke-${category.id}`}
                className="orbit-spoke"
                style={{
                  '--accent': category.accent,
                  '--angle': `${(360 / categories.length) * index - 90}deg`,
                  '--delay': `${index * 0.55}s`,
                }}
                aria-hidden="true"
              />
            ))}
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  to={`/${category.id}`}
                  className="orbit-node"
                  style={{
                    '--accent': category.accent,
                    '--angle': `${(360 / categories.length) * index - 90}deg`,
                  }}
                >
                  <span className="orbit-node-body">
                    <span className="orbit-node-icon">
                      <Icon size={24} />
                    </span>
                    <span className="orbit-node-label">{category.title}</span>
                  </span>
                </Link>
              )
            })}
          </div>

          {tags.map((tag, index) => (
            <span
              key={tag.id}
              className="orbit-tag"
              style={{
                '--accent': tag.item.accent,
                left: tag.x,
                top: tag.y,
                animationDelay: `${index * -1.3}s`,
              }}
              aria-hidden="true"
            >
              {tag.item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
