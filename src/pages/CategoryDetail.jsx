import { useEffect } from 'react'
import { ArrowUpRight, ChevronRight, CircleCheck } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CategorySlider from '../components/CategorySlider.jsx'
import { ctaPerks, ctaText } from '../data/solutionContent.js'
import { findCategory } from '../data/solutions.js'

export default function CategoryDetail() {
  const { categoryId } = useParams()
  const category = findCategory(categoryId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [categoryId])

  if (!category) return <Navigate to="/" replace />

  const Icon = category.icon

  return (
    <div className="family-page" style={{ '--accent': category.accent }}>
      <section className="family-hero">
        <div className="family-hero-float" key={category.id} aria-hidden="true">
          {category.items.map((item, index) => {
            const ItemIcon = item.icon
            return (
              <span key={item.id} style={{ '--f': index, '--n': category.items.length }}>
                <ItemIcon size={22} strokeWidth={1.8} />
              </span>
            )
          })}
        </div>
        <div className="family-hero-inner">
          <div className="family-hero-copy enter-stagger">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Solutions</Link>
              <ChevronRight size={14} />
              <span>{category.title}</span>
            </nav>
            <p className="family-hero-kicker">
              <span className="family-hero-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2} />
              </span>
              {category.tagline}
            </p>
            <h1>{category.title}</h1>
            <p className="family-hero-intro">{category.intro}</p>
          </div>

          <div className="family-hero-panel" key={category.id}>
            <p className="family-hero-panel-title">Products</p>
            <ul className="family-hero-list">
              {category.items.map((item, index) => {
                const ItemIcon = item.icon
                return (
                  <li key={item.id} className="chip-enter" style={{ '--i': index }}>
                    <Link to={`/${category.id}/${item.id}`} className="family-chip">
                      <span className="family-chip-icon" aria-hidden="true">
                        <ItemIcon size={17} strokeWidth={2} />
                      </span>
                      <span className="family-chip-text">
                        <strong>{item.name}</strong>
                        {item.fullName ? <small>{item.fullName}</small> : null}
                      </span>
                      <ArrowUpRight className="family-chip-arrow" size={16} aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <CategorySlider key={category.id} category={category} showHead={false} />

      <section className="family-cta">
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
    </div>
  )
}
