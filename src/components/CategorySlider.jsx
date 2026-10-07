import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard } from 'swiper/modules'
import 'swiper/css'

const canHover = () => window.matchMedia('(min-width: 800px)').matches

export default function CategorySlider({ category, number, showHead = true }) {
  const Icon = category.icon
  const stageRef = useRef(null)
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [highlight, setHighlight] = useState(null)
  const [hovering, setHovering] = useState(false)
  const [moving, setMoving] = useState(false)

  const count = category.items.length
  // With fewer than 3 products a carousel would repeat the same product on both
  // sides, so they are shown side by side, centred, instead.
  const compact = count < 3
  // Swiper's loop mode needs more slides than are visible at once.
  const slides = compact
    ? category.items
    : Array.from({ length: Math.max(2, Math.ceil(6 / count)) }, () => category.items).flat()

  const moveHighlightTo = useCallback((element) => {
    const stage = stageRef.current
    if (!stage || !element) return
    const stageBox = stage.getBoundingClientRect()
    const box = element.getBoundingClientRect()
    setHighlight({
      x: box.left - stageBox.left,
      y: box.top - stageBox.top,
      width: box.width,
      height: box.height,
    })
  }, [])

  const highlightActive = useCallback(() => {
    moveHighlightTo(
      stageRef.current?.querySelector('.swiper-slide-active .product-slide, .is-current .product-slide'),
    )
  }, [moveHighlightTo])

  useEffect(() => {
    if (!compact) return undefined
    highlightActive()
    window.addEventListener('resize', highlightActive)
    return () => window.removeEventListener('resize', highlightActive)
  }, [compact, activeIndex, highlightActive])

  const settle = () => {
    setMoving(false)
    highlightActive()
  }

  const goTo = (index) => {
    if (compact) setActiveIndex(Math.min(Math.max(index, 0), count - 1))
    else swiperRef.current?.slideToLoop(index)
  }

  const goPrev = () => (compact ? goTo(activeIndex - 1) : swiperRef.current?.slidePrev())
  const goNext = () => (compact ? goTo(activeIndex + 1) : swiperRef.current?.slideNext())

  const renderSlide = (item) => (
    <Link
      to={`/${category.id}/${item.id}`}
      className="product-slide"
      onMouseEnter={(event) => {
        if (!canHover()) return
        setHovering(true)
        moveHighlightTo(event.currentTarget)
      }}
      onMouseLeave={() => {
        setHovering(false)
        highlightActive()
      }}
    >
      <span className="product-slide-head">
        <span className="product-slide-name">{item.name}</span>
        {item.fullName ? <span className="product-slide-full">{item.fullName}</span> : null}
      </span>
      {item.headline ? <span className="product-slide-title">{item.headline}</span> : null}
      {item.summary ? <span className="product-slide-text">{item.summary}</span> : null}
      <span className="product-slide-cta">
        Explore
        <ArrowRight size={16} />
      </span>
    </Link>
  )

  return (
    <section
      id={category.id}
      className={`category-slider${showHead ? '' : ' is-headless'}`}
      style={{ '--accent': category.accent, '--slider-bg': category.gradient }}
      aria-labelledby={showHead ? `${category.id}-title` : undefined}
      aria-label={showHead ? undefined : `${category.title} products`}
    >
      {showHead ? (
        <div className="category-head">
          {number ? <span className="category-num">{number}</span> : null}
          <span className="category-icon">
            <Icon size={30} strokeWidth={2} />
          </span>
          <h2 id={`${category.id}-title`}>{category.title}</h2>
          {category.intro ? <p className="category-intro">{category.intro}</p> : null}
          <p className="category-list">{category.items.map((item) => item.name).join(' · ')}</p>
        </div>
      ) : null}

      <div className={`slider-stage${hovering ? ' is-hovering' : ''}`} ref={stageRef}>
        <div
          className={`slider-highlight${highlight && !moving ? ' is-visible' : ''}`}
          style={
            highlight
              ? {
                  width: highlight.width,
                  height: highlight.height,
                  transform: `translate(${highlight.x}px, ${highlight.y}px)`,
                }
              : undefined
          }
          aria-hidden="true"
        />

        {compact ? (
          <div className="product-row">
            {slides.map((item, index) => (
              <div
                key={item.id}
                className={`product-slider-item${index === activeIndex ? ' is-current' : ''}`}
              >
                {renderSlide(item)}
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Keyboard]}
            className="product-slider"
            loop
            centeredSlides
            grabCursor
            slidesPerView="auto"
            spaceBetween={0}
            speed={300}
            keyboard={{ enabled: true, onlyInViewport: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              requestAnimationFrame(highlightActive)
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % count)}
            onSlideChangeTransitionStart={() => setMoving(true)}
            onSliderMove={() => setMoving(true)}
            onTransitionEnd={settle}
            onTouchEnd={() => window.setTimeout(settle, 320)}
            onResize={settle}
          >
            {slides.map((item, index) => (
              <SwiperSlide key={`${item.id}-${index}`} className="product-slider-item">
                {renderSlide(item)}
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="slider-controls">
          <button
            type="button"
            className="slider-arrow slider-arrow--prev"
            aria-label="Previous product"
            disabled={compact && activeIndex === 0}
            onClick={goPrev}
          >
            <ArrowLeft size={18} />
          </button>

          <div className="slider-pagination">
            {category.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === activeIndex ? 'is-active' : undefined}
                aria-label={`Show ${item.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="slider-arrow slider-arrow--next"
            aria-label="Next product"
            disabled={compact && activeIndex === count - 1}
            onClick={goNext}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
