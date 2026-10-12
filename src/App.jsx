import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import Home from './pages/Home.jsx'
import CategoryDetail from './pages/CategoryDetail.jsx'
import SolutionDetail from './pages/SolutionDetail.jsx'
import useScrollReveal from './hooks/useScrollReveal.js'

export default function App() {
  useScrollReveal()

  const [booting, setBooting] = useState(true)
  const [bootKey, setBootKey] = useState(0)
  const [revealed, setRevealed] = useState(false)

  // `is-booting` (set in index.html) holds the hero's entrance animation until the preloader fades.
  useEffect(() => {
    document.documentElement.classList.toggle('is-booting', !revealed)
  }, [revealed])

  // Pages restored from the back/forward cache skip the boot, so the preloader replays.
  useEffect(() => {
    const onPageShow = (event) => {
      if (!event.persisted) return
      setBootKey((key) => key + 1)
      setRevealed(false)
      setBooting(true)
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  const reveal = useCallback(() => setRevealed(true), [])
  const finishBoot = useCallback(() => setBooting(false), [])

  return (
    <div className="app">
      {booting && <Preloader key={bootKey} onReveal={reveal} onDone={finishBoot} />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categoryId" element={<CategoryDetail />} />
          <Route path="/:categoryId/:itemId" element={<SolutionDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
