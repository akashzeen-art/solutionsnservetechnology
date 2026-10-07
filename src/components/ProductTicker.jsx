import { Link } from 'react-router-dom'
import { categories } from '../data/solutions.js'

const products = categories.flatMap((category) => category.items.map((item) => ({ item, category })))

function TickerRow({ rows, reverse }) {
  return (
    <div className={`ticker-row${reverse ? ' is-reverse' : ''}`} aria-hidden={reverse || undefined}>
      <div className="ticker-track">
        {[...rows, ...rows].map(({ item, category }, index) => {
          const Icon = item.icon
          const hidden = reverse || index >= rows.length
          return (
            <Link
              key={`${item.id}-${index}`}
              to={`/${category.id}/${item.id}`}
              className="ticker-item"
              style={{ '--accent': category.accent }}
              aria-hidden={!reverse && hidden ? true : undefined}
              tabIndex={hidden ? -1 : undefined}
            >
              <span className="ticker-icon">
                <Icon size={15} strokeWidth={2.2} />
              </span>
              {item.name}
              {item.fullName ? <small>{item.fullName}</small> : null}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function ProductTicker() {
  return (
    <section className="ticker" aria-label="All nSERVE products">
      <TickerRow rows={products} />
      <TickerRow rows={[...products].reverse()} reverse />
    </section>
  )
}
