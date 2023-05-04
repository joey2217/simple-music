import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { usePlaylist } from '../../../store/hooks'
import { ChevronDown, LoadingIcon, RoundClose } from '../../icons'
import emitter from '../../../utils/events'
import { Link } from 'react-router-dom'

interface Props {
  open: boolean
  onClose: () => void
}

let prevTime = 0

const Lyric: React.FC<Props> = ({ open, onClose }) => {
  const lyricEl = useRef<HTMLDivElement>(null)
  const { currentPlayLyricLoadable, currentPlay } = usePlaylist()

  const [lyricIndex, setLyricIndex] = useState(0)

  const lyricTimes = useMemo(() => {
    if (currentPlayLyricLoadable.state === 'hasValue') {
      return currentPlayLyricLoadable.contents.map((item) => item.time)
    }
    return null
  }, [currentPlayLyricLoadable.contents, currentPlayLyricLoadable.state])

  const lyric = useMemo(() => {
    if (currentPlayLyricLoadable.state === 'hasValue') {
      return currentPlayLyricLoadable.contents.map((item, index) => (
        <div
          key={item.time}
          className={`${index === lyricIndex ? 'text-indigo-600 current' : ''}`}
        >
          {item.lineLyric}
        </div>
      ))
    }
    if (currentPlayLyricLoadable.state === 'loading') {
      return (
        <div className="h-full flex justify-center items-center">
          <LoadingIcon className="text-4xl text-indigo-600" />
        </div>
      )
    }
    return null
  }, [
    currentPlayLyricLoadable.contents,
    currentPlayLyricLoadable.state,
    lyricIndex,
  ])

  const onTimeUpdate = useCallback(
    (t: number) => {
      if (lyricTimes) {
        if (t - prevTime === 1) {
          if (lyricTimes) {
            if (t <= lyricTimes[0]) {
              setLyricIndex(0)
            } else if (t > lyricTimes[0] && t < lyricTimes[1]) {
              setLyricIndex(1)
            } else {
              setLyricIndex((i) =>
                t > lyricTimes[i] && t < lyricTimes[i + 1] ? i : i + 1
              )
            }
          }
        } else {
          const index = lyricTimes.findIndex((l, i, arr) => {
            if (i === 0) {
              return false
            } else if (t > l && t < arr[i + 1]) {
              return true
            } else {
              return false
            }
          })
          setLyricIndex(index)
        }
        prevTime = t
        if (lyricEl.current) {
          const current = lyricEl.current.querySelector('.current')
          if (current) {
            current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        }
      }
    },
    [lyricTimes]
  )

  useEffect(() => {
    emitter.on('timeUpdate', onTimeUpdate)
    return () => {
      emitter.off('timeUpdate', onTimeUpdate)
    }
  }, [onTimeUpdate])

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open])

  return createPortal(
    <div
      className={`fixed top-0 right-0 w-full p-4 rounded h-screen bg-neutral-50 dark:bg-neutral-600 transition-transform ease-in-out duration-300 ${
        open ? 'translate-y-0' : 'translate-y-full'
      }	`}
    >
      <div className="flex items-start justify-center">
        <button 
          title="收起"
          onClick={onClose}
          className="text-4xl hover:text-indigo-600">
          <ChevronDown />
        </button>
        <div className="flex-1 text-center">
          {currentPlay && (
            <>
              <Link
                to={'/music/' + currentPlay.rid}
                className="text-2xl link"
                onClick={onClose}
              >
                {currentPlay.name}
              </Link>
              <p className="flex items-center justify-center my-2 gap-2">
                <Link
                  to={'/artist/' + currentPlay.artistid}
                  className="link"
                  onClick={onClose}
                >
                  {currentPlay.artist}
                </Link>
                <span>-</span>
                <Link
                  to={'/album/' + currentPlay.albumid}
                  className="link"
                  onClick={onClose}
                >
                  {currentPlay.album}
                </Link>
              </p>
            </>
          )}
        </div>
        <button
          title="关闭"
          onClick={onClose}
          className="text-4xl hover:text-indigo-600"
        >
          <RoundClose />
        </button>
      </div>
      <div
        className="flex flex-col gap-2 pt-4 pb-10 text-center overflow-auto"
        style={{
          height: 'calc(100vh - 190px)',
        }}
        ref={lyricEl}
      >
        {lyric}
      </div>
    </div>,
    document.body
  )
}

export default memo(Lyric)
