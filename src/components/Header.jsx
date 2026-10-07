import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/solutions.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <Link to="/" className="brand">
        <img src="/nservelogo.png" alt="nSERVE Solutions" />
      </Link>

      <nav className="header-nav" aria-label="Solution categories">
        {categories.map((category) => (
          <Link key={category.id} to={`/${category.id}`} style={{ '--accent': category.accent }}>
            {category.title}
          </Link>
        ))}
      </nav>
    </header>
  )
}
