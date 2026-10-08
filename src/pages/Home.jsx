import { useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import FamilyCards from '../components/FamilyCards.jsx'
import Hero from '../components/Hero.jsx'
import LiveDemos from '../components/LiveDemos.jsx'
import ParallaxBand from '../components/ParallaxBand.jsx'
import ProductTicker from '../components/ProductTicker.jsx'
import { homeCta } from '../data/solutionContent.js'

export default function Home() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const target = document.getElementById(hash.slice(1))
    if (!target) return
    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
      behavior: 'smooth',
    })
  }, [hash, key])

  return (
    <>
      <Hero />

      <ProductTicker />

      <FamilyCards />

      <ParallaxBand />

      <LiveDemos />

      <section className="home-cta">
        <div className="home-cta-card" data-reveal="zoom">
          <span className="home-cta-icon" aria-hidden="true">
            <Sparkles size={26} />
          </span>
          <h2>{homeCta.title}</h2>
          <p>{homeCta.text}</p>
        </div>
      </section>
    </>
  )
}
