import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.querySelector('.app > main')
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      const revealAll = () =>
        root.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'))
      revealAll()
      const mutations = new MutationObserver(revealAll)
      mutations.observe(root, { childList: true, subtree: true })
      return () => mutations.disconnect()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    const scan = () =>
      root.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => observer.observe(el))
    scan()
    const mutations = new MutationObserver(scan)
    mutations.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [pathname])
}
