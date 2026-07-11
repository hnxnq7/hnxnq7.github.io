import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './Gallery.css'

type Photo = {
  src?: string
  alt: string
}

const ROTATIONS = [-6, 4, -3, 6, -4, 3, -5, 5]
const OFFSETS = ['4%', '34%', '14%', '26%', '2%', '30%', '10%', '20%']
const WIDTHS = ['72%', '60%', '68%', '58%', '64%']

function Gallery({ photos }: { photos: Photo[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const topZRef = useRef(photos.length)
  const [zIndices, setZIndices] = useState<number[]>(() => photos.map((_, i) => i + 1))

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.gallery-item')
    if (!items) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.2 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [photos])

  const bringToFront = (i: number) => {
    topZRef.current += 1
    const z = topZRef.current
    setZIndices((prev) => {
      const next = [...prev]
      next[i] = z
      return next
    })
  }

  return (
    <div className="gallery" ref={containerRef}>
      {photos.map((photo, i) => {
        const style: CSSProperties & Record<'--rot', string> = {
          transitionDelay: `${(i % 3) * 80}ms`,
          marginLeft: OFFSETS[i % OFFSETS.length],
          width: WIDTHS[i % WIDTHS.length],
          zIndex: zIndices[i],
          '--rot': `${ROTATIONS[i % ROTATIONS.length]}deg`,
        }
        return (
          <div
            key={i}
            className="gallery-item"
            style={style}
            onClick={() => bringToFront(i)}
            onMouseEnter={() => bringToFront(i)}
          >
            {photo.src ? (
              <img src={photo.src} alt={photo.alt} />
            ) : (
              <div className="gallery-placeholder">{photo.alt}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Gallery
