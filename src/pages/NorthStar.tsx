import { useEffect } from 'react'
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
]

function NorthStar() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('night')
  }, [setTheme])

  return (
    <div className="page north-star">
      <div className="emoji">🌌</div>
      <p>
        My goal: experience as many interesting things with as many cool
        and fun people as I can.
        <br />
        <br />
        That means to me learning about the world constantly and pushing
        the boundary, being helpful and kind to the people around me, and
        noticing and appreciating beauty in whatever form it shows up in
        :D
      </p>

      <MusicPlayer />

      <Gallery photos={photos} />
    </div>
  )
}

export default NorthStar
