import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './useInView.js'

/**
 * Writes scroll position into CSS variables on the element:
 * --sy: pixels scrolled past the element's top (0 until it reaches the top of the viewport)
 * --p:  -1 when the element enters from the bottom, 0 when centred, 1 when it leaves at the top
 * With `pointer: true` it also writes --mx / --my (-1 to 1) from the cursor position.
 */
export default function useParallax({ pointer = false } = {}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < -vh || rect.top > vh * 2) return
      const progress = (vh - rect.top) / (vh + rect.height)
      node.style.setProperty('--p', (Math.min(1, Math.max(0, progress)) * 2 - 1).toFixed(4))
      node.style.setProperty('--sy', Math.max(0, -rect.top).toFixed(1))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onPointer = (event) => {
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3))
      node.style.setProperty('--my', (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3))
    }
    const onLeave = () => {
      node.style.setProperty('--mx', '0')
      node.style.setProperty('--my', '0')
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    if (pointer && fine) {
      node.addEventListener('pointermove', onPointer)
      node.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      node.removeEventListener('pointermove', onPointer)
      node.removeEventListener('pointerleave', onLeave)
      for (const name of ['--p', '--sy', '--mx', '--my']) node.style.removeProperty(name)
    }
  }, [pointer, reduced])

  return ref
}
