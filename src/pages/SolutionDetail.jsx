import { useEffect } from 'react'
import { ChevronRight, CircleCheck, Clock } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CountUp from '../components/CountUp.jsx'
import SolutionCard from '../components/SolutionCard.jsx'
import { ctaPerks, ctaText, solutionContent } from '../data/solutionContent.js'
import { findSolution } from '../data/solutions.js'

function FeaturesSection({ section }) {
  return (
    <section className="detail-section">
      <h2 data-reveal>{section.title}</h2>
      <div className="feature-grid">
        {section.items.map((feature, index) => (
          <article key={feature.title} className="feature-card" data-reveal style={{ '--i': index % 3 }}>
            <div className="feature-card-head">
              <span className="feature-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{feature.title}</h3>
            </div>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ListsSection({ section }) {
  return (
    <section className="detail-section">
      <div className={`list-grid${section.groups.length > 1 ? ' is-multi' : ''}`}>
        {section.groups.map((group, groupIndex) => (
          <article
            key={group.title}
            className={`list-card${group.image ? ' has-image' : ''}`}
            data-reveal
            style={{ '--i': groupIndex }}
          >
            {group.image ? <img src={group.image} alt="" loading="lazy" /> : null}
            <div className="list-card-body">
              <h2>{group.title}</h2>
              <ul className={group.items.length > 6 ? 'two-col' : undefined}>
                {group.items.map((point, index) => (
                  <li key={point} data-reveal="left" style={{ '--i': Math.min(index, 8) }}>
                    <CircleCheck size={20} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function StatsSection({ section }) {
  return (
    <section className="detail-section stats-section">
      <h2 data-reveal>{section.title}</h2>
      {section.subtitle ? <p className="stats-sub">{section.subtitle}</p> : null}
      <div className="stats-grid">
        {section.items.map((stat, index) => (
          <div key={stat.label} className="stat-card" data-reveal="zoom" style={{ '--i': index }}>
            <strong>
              <CountUp value={stat.value} />
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const sectionRenderers = {
  features: FeaturesSection,
  lists: ListsSection,
  stats: StatsSection,
}

export default function SolutionDetail() {
  const { categoryId, itemId } = useParams()
  const match = findSolution(categoryId, itemId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [categoryId, itemId])

  if (!match) return <Navigate to="/" replace />

  const { category, item } = match
  const Icon = item.icon
  const content = solutionContent[item.id] ?? { pending: true }
  const siblings = category.items.filter((i) => i.id !== item.id)
  const featureTitles =
    content.sections?.find((section) => section.type === 'features')?.items.map((feature) => feature.title) ?? []
  const listGroups = content.sections?.find((section) => section.type === 'lists')?.groups ?? []
  const visualTags = featureTitles.length
    ? featureTitles
    : listGroups.length > 1
      ? listGroups.map((group) => group.title)
      : (listGroups[0]?.items ?? [])

  return (
    <div className="detail" style={{ '--accent': category.accent }}>
      <section className="product-hero">
        <div className="product-hero-inner">
          <div className="product-hero-copy enter-stagger">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Solutions</Link>
              <ChevronRight size={14} />
              <Link to={`/${category.id}`}>{category.title}</Link>
              <ChevronRight size={14} />
              <span>{item.name}</span>
            </nav>
            <p className="family-hero-kicker">
              <span className="family-hero-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2} />
              </span>
              {category.title}
            </p>
            <h1>{item.name}</h1>
            {item.fullName ? <p className="product-hero-full">{item.fullName}</p> : null}
            {content.tagline ? <p className="product-hero-tagline">{content.tagline}</p> : null}
            {content.intro ? <p className="product-hero-lead">{content.intro}</p> : null}
            {content.extra?.map((text) => (
              <p key={text} className="product-hero-text">
                {text}
              </p>
            ))}
          </div>
          {content.image ? (
            <figure className="product-hero-media" key={item.id}>
              <img src={content.image} alt="" />
              <span className="media-shine" aria-hidden="true" />
              <span className="media-badge media-badge--live">
                <i /> {item.name} · Live
              </span>
              {featureTitles.length ? (
                <span className="media-badge media-badge--stat">
                  <Icon size={16} strokeWidth={2.2} />
                  {featureTitles.length} key capabilities
                </span>
              ) : null}
            </figure>
          ) : (
            <div className="product-visual" key={item.id} aria-hidden="true">
              <span className="product-visual-ring" />
              <span className="product-visual-ring" style={{ '--r': 1 }} />
              <span className="product-visual-ring" style={{ '--r': 2 }} />
              <span className="product-visual-core">
                <Icon size={56} strokeWidth={1.6} />
              </span>
              {visualTags.slice(0, 3).map((title, index) => (
                <span key={title} className={`product-visual-tag product-visual-tag--${index}`}>
                  {title}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {content.sections?.map((section, index) => {
        const Section = sectionRenderers[section.type]
        return <Section key={`${section.type}-${index}`} section={section} />
      })}

      {content.pending ? (
        <section className="detail-section">
          <div className="coming-soon">
            <Clock size={22} />
            <div>
              <strong>More details coming soon</strong>
              <p>Full details for {item.name} will be added here.</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="detail-section">
        <div className="cta-band" data-reveal="zoom">
          <div>
            <h2>{ctaText}</h2>
            <p className="cta-perks-title">What you will get</p>
            <ul className="cta-perks">
              {ctaPerks.map((perk) => (
                <li key={perk}>
                  <CircleCheck size={18} />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {siblings.length ? (
        <section className="detail-section detail-more">
          <h2 data-reveal>More in {category.title}</h2>
          <div className="category-grid">
            {siblings.map((sibling, index) => (
              <div key={sibling.id} data-reveal style={{ '--i': index % 4 }}>
                <SolutionCard category={category} item={sibling} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
