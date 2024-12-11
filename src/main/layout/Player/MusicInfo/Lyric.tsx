import React, { useEffect, useMemo, useState } from 'react'
import LazyImage from '@/main/components/LazyLoadImage'
import type { Music } from '@/main/types/player'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ReactDOM from 'react-dom'
import SongLyric from '@/main/components/SongLyric'
import { usePlayer } from '../PlayerContext'
import { Link } from 'react-router'
import emitter from '@/main/utils/emitter'

interface Props {
  music: Music
}

const Lyric: React.FC<Props> = ({ music }) => {
  const [open, setOpen] = useState(false)
  const { time, paused } = usePlayer()

  const animate = useMemo(() => !paused && open, [open, paused])

  useEffect(() => {
    const close = () => setOpen(false)
    emitter.on('closeLyric', close)
    return () => emitter.off('closeLyric', close)
  }, [])

  return (
    <>
      <div className="group relative h-16 w-16 rounded overflow-hidden">
        <LazyImage
          className="w-full aspect-square"
          src={music.pic}
          alt={music.title}
        />
        <div
          onClick={() => setOpen((s) => !s)}
          className="w-full aspect-square absolute top-0 left-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {open ? <ChevronDown size={48} /> : <ChevronUp size={48} />}
        </div>
      </div>
      {ReactDOM.createPortal(
        <div
          id="lyric"
          className={`scrollbar text-center fixed top-0 left-0 w-full z-20 shadow-md bg-background/95 transition-all duration-300 ease-in-out ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-[100vh] opacity-0'
          }`}
        >
          <div id="lyric-header">
            <div className="flex items-center mr-16 titleBar-ml">
              <button
                onClick={() => setOpen(false)}
                className="w-16"
                title="收起"
              >
                <ChevronDown size={40} className="mx-auto" />
              </button>
              <div className="draggable flex-1 text-xl font-semibold">
                <h2>{music.title}</h2>
              </div>
            </div>
          </div>
          <div className="fixed w-1/4 -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <LazyImage
              src={music.pic}
              alt={music.title}
              className="w-full rounded-full blur-sm animate-spin"
              style={{
                animationDuration: '20s',
                animationPlayState: animate ? 'running' : 'paused',
              }}
            />
          </div>
          <div className="h-10 z-30 flex gap-2 items-center text-sm justify-center">
            <span>歌手:</span>
            <div className="artists">
              {music.artists.map((artist) => (
                <Link
                  to={`/artist/${artist.id}`}
                  key={artist.id}
                  onClick={() => setOpen(false)}
                >
                  <span className="underline-offset-4 hover:underline text-accent-foreground/80 hover:text-accent-foreground">
                    {artist.name}
                  </span>
                </Link>
              ))}
            </div>
            <span>专辑:</span>
            <Link
              className="underline-offset-4 hover:underline text-accent-foreground/80 hover:text-accent-foreground"
              to={`/album/${music.albumId}`}
              onClick={() => setOpen(false)}
            >
              {music.album}
            </Link>
          </div>
          <div id="lyric-content" className="scrollbar">
            <SongLyric
              copyrightId={music.copyrightId}
              time={time}
              scroll={open}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Lyric
