import { useEffect, useState } from 'react'
import useInView, { usePrefersReducedMotion } from '../hooks/useInView.js'

function parse(value) {
  const match = String(value).match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const [, prefix, number, suffix] = match
  const decimals = number.includes('.') ? number.split('.')[1].length : 0
  return { prefix, target: Number(number.replace(/,/g, '')), suffix, decimals, grouped: number.includes(',') }
}

export default function CountUp({ value, duration = 1600 }) {
  const parsed = parse(value)
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView({ once: true, threshold: 0.4 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!parsed || !inView || reduced) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration))
      setCurrent(parsed.target * (1 - (1 - t) ** 3))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, duration, parsed?.target])

  if (!parsed) return <span ref={ref}>{value}</span>

  const shown = reduced ? parsed.target : current
  const number = shown.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.grouped,
  })

  return (
    <span ref={ref} aria-label={value}>
      {parsed.prefix}
      {number}
      {parsed.suffix}
    </span>
  )
}
