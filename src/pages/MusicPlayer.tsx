import { useEffect, useState } from 'react'
import './MusicPlayer.css'

type Song = { title: string; artist: string; uri: string }

// sourced from https://open.spotify.com/playlist/3el8hUSZd9zDjtO6QG90i1 ("web!"), update as it grows
const songs: Song[] = [
  { title: 'Loud', artist: 'NMIXX', uri: 'spotify:track:5rGrtds032AS35wDDyTNN4' },
  { title: 'カタオモイ', artist: 'Aimer', uri: 'spotify:track:6g93YtKKHU2H1qIqhLIL0Y' },
  { title: 'Ribs', artist: 'Lorde', uri: 'spotify:track:2MvvoeRt8NcOXWESkxWn3g' },
  { title: 'MILLION PLACES', artist: 'XG', uri: 'spotify:track:4HJNGbmQomaeZoh6aOYDIT' },
]

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void
  }
}

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width: string; height: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void
}

type SpotifyEmbedController = {
  loadUri: (uri: string) => void
  play: () => void
  pause: () => void
  addListener: (event: string, cb: (e: { data: { isPaused: boolean } }) => void) => void
}

// kept at module scope (not component refs) so the controller and its readiness
// survive across mount/unmount as the router navigates to and from this page —
// a component ref would reset to null on remount even though the underlying
// Spotify iframe (mounted outside React's tree) and its API session are still alive
let sharedController: SpotifyEmbedController | null = null
let pendingSong: Song | null = null
let onPlayingChange: ((playing: boolean) => void) | null = null

function playSong(song: Song) {
  if (sharedController) {
    sharedController.loadUri(song.uri)
    sharedController.play()
  } else {
    pendingSong = song
  }
}

function MusicPlayer() {
  const [current, setCurrent] = useState<Song | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    onPlayingChange = setPlaying

    let mount = document.getElementById('spotify-mount-point')
    if (!mount) {
      mount = document.createElement('div')
      mount.id = 'spotify-mount-point'
      mount.style.position = 'fixed'
      mount.style.width = '1px'
      mount.style.height = '1px'
      mount.style.overflow = 'hidden'
      mount.style.opacity = '0'
      mount.style.pointerEvents = 'none'
      document.body.appendChild(mount)
    }

    if (!document.getElementById('spotify-iframe-api')) {
      const script = document.createElement('script')
      script.id = 'spotify-iframe-api'
      script.src = 'https://open.spotify.com/embed/iframe-api/v1'
      script.async = true
      document.body.appendChild(script)
    }

    const next = songs[Math.floor(Math.random() * songs.length)]
    setCurrent(next)
    playSong(next)

    if (sharedController) return

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const el = document.getElementById('spotify-mount-point')
      if (!el || sharedController) return
      IFrameAPI.createController(
        el,
        { uri: songs[0].uri, width: '1', height: '1' },
        (controller) => {
          sharedController = controller
          controller.addListener('playback_update', (e) => {
            onPlayingChange?.(!e?.data?.isPaused)
          })
          if (pendingSong) {
            controller.loadUri(pendingSong.uri)
            controller.play()
            pendingSong = null
          }
        }
      )
    }
  }, [])

  const shuffle = () => {
    const next = songs[Math.floor(Math.random() * songs.length)]
    setCurrent(next)
    playSong(next)
  }

  return (
    <div className="music-player">
      <button
        type="button"
        className={`cd-button ${playing ? 'spinning' : ''}`}
        onClick={shuffle}
        aria-label="shuffle and play a favorite song"
      >
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="16" cy="16" r="14" fill="none" stroke="var(--star)" strokeWidth="1" />
          <circle cx="16" cy="16" r="9" fill="none" stroke="var(--star)" strokeWidth="0.6" opacity="0.6" />
          <circle cx="16" cy="16" r="2.4" fill="var(--star)" />
        </svg>
      </button>

      {current && (
        <div className="music-label">
          {current.title} · {current.artist}
        </div>
      )}
    </div>
  )
}

export default MusicPlayer
