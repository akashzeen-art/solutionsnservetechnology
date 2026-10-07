import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/solutions.js'

function FamilyCard({ category, index }) {
  const Icon = category.icon

  return (
    <div className="fc-cell" data-reveal style={{ '--i': index }}>
      <article
        className="fc"
        style={{ '--accent': category.accent, '--fc-bg': category.gradient }}
        aria-labelledby={`fc-${category.id}`}
      >
        <div className="fc-flip">
          <div className="fc-flip-inner">
            <div className="fc-front">
              <div className="fc-front-top">
                <Icon className="fc-front-icon" size={46} strokeWidth={1.7} aria-hidden="true" />
                <h3 id={`fc-${category.id}`} className="fc-front-title">
                  {category.title}
                </h3>
                <p className="fc-front-list">{category.items.map((item) => item.name).join(' · ')}</p>
              </div>
              <p className="fc-front-hint">View me</p>
            </div>
            <div className="fc-back" aria-hidden="true">
              <Icon className="fc-back-icon" size={96} strokeWidth={1.2} />
            </div>
          </div>
        </div>

        <div className="fc-inside">
          <h4 className="fc-inside-title">{category.tagline}</h4>
          <p className="fc-inside-text">{category.blurb}</p>
          <Link to={`/${category.id}`} className="fc-inside-btn" aria-label={`View ${category.title} details`}>
            View details
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  )
}

export default function FamilyCards() {
  return (
    <section className="families" aria-labelledby="families-title">
      <div className="families-head" data-reveal>
        <p className="families-kicker">Solution families</p>
        <h2 id="families-title">Four ways nSERVE powers your network</h2>
      </div>
      <div className="families-grid">
        {categories.map((category, index) => (
          <FamilyCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  )
}
