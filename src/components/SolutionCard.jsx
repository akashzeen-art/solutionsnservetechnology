import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SolutionCard({ category, item }) {
  const Icon = item.icon

  return (
    <Link to={`/${category.id}/${item.id}`} className="solution-card">
      <span className="solution-card-top">
        <span className="solution-card-icon">
          <Icon size={24} strokeWidth={2} />
        </span>
        <ArrowUpRight className="solution-card-arrow" size={20} />
      </span>
      <span className="solution-card-text">
        <strong>{item.name}</strong>
        {item.fullName ? <small>{item.fullName}</small> : null}
      </span>
      {item.headline ? <span className="solution-card-headline">{item.headline}</span> : null}
      {item.summary ? <span className="solution-card-summary">{item.summary}</span> : null}
    </Link>
  )
}
