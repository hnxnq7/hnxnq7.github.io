import { useEffect, useMemo } from 'react'
import { useTheme } from '../theme'
import Gallery from './Gallery'
import MusicPlayer from './MusicPlayer'
import './Page.css'
import './NorthStar.css'

const photos = [
  { src: '/gallery/IMG_9867.JPG', alt: 'forest with fairy lights' },
  { src: '/gallery/IMG_0415.JPG', alt: 'golf swing' },
  { src: '/gallery/IMG_2299.JPG', alt: 'two friends by the river' },
  { src: '/gallery/IMG_2997.jpeg', alt: 'a hug, mid laugh' },
  { src: '/gallery/IMG_2842.JPG', alt: 'green and black dresses at sunset' },
  { src: '/gallery/IMG_3784.jpeg', alt: 'pointing at a sky on fire' },
  { src: '/gallery/IMG_6931.JPG', alt: 'five shadows, one sunset' },
  { src: '/gallery/IMG_5199.jpeg', alt: 'snow day' },
  { src: '/gallery/IMG_6528.jpeg', alt: 'up the wall' },
  { src: '/gallery/IMG_3624.JPG', alt: 'graduation day' },
  { src: '/gallery/IMG_0167.JPG', alt: 'a rainbow of keychains' },
  { src: '/gallery/IMG_1435.jpeg', alt: 'halloween with the girls' },
  { src: '/gallery/IMG_2667.JPG', alt: 'a hug in lobby 7' },
  { src: '/gallery/IMG_2706.JPG', alt: 'bathroom mirror chaos' },
  { src: '/gallery/IMG_3134.JPG', alt: 'a night in animal crossing' },
  { src: '/gallery/IMG_3223.jpeg', alt: 'stargazing on a rooftop' },
  { src: '/gallery/IMG_4280.jpeg', alt: 'horseback riding' },
  { src: '/gallery/IMG_4390.jpeg', alt: 'peace sign at the edge of the world' },
  { src: '/gallery/IMG_5849.JPG', alt: 'building a snowman' },
  { src: '/gallery/IMG_6475.JPG', alt: 'golden hour with friends' },
  { src: '/gallery/IMG_6476.JPG', alt: 'a walk through the snow' },
  { src: '/gallery/IMG_8338.jpeg', alt: 'meeting a sea turtle' },
  { src: '/gallery/IMG_9683.jpeg', alt: 'collapsed in the snow after a ski' },
  { src: '/gallery/IMG_9725.JPG', alt: 'recital day with mom' },
]

function shuffle<T>(arr: T[]): T[] {
  const next = [...arr]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function NorthStar() {
  const { setTheme } = useTheme()
  // re-shuffled on every mount, so reopening the page gives a new photo order
  const shuffledPhotos = useMemo(() => shuffle(photos), [])

  useEffect(() => {
    setTheme('night')
  }, [setTheme])

  return (
    <div className="page north-star">
      <div className="emoji">🌌</div>
      <p>
        My goal: experience as many interesting things with as many cool
        and fun people as I can :D
      </p>

      <MusicPlayer />

      <Gallery photos={shuffledPhotos} />

      <p className="north-star-footer">
        That means to me learning about the world constantly and pushing
        the boundary, being helpful and kind to the people around me, and
        noticing and appreciating beauty in whatever form it shows up in!
      </p>
    </div>
  )
}

export default NorthStar
