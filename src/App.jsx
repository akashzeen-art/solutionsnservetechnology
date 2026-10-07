import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import CategoryDetail from './pages/CategoryDetail.jsx'
import SolutionDetail from './pages/SolutionDetail.jsx'
import useScrollReveal from './hooks/useScrollReveal.js'

export default function App() {
  useScrollReveal()

  return (
    <div className="app">
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
