import React, { useCallback, useState, type PropsWithChildren } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import type { Music } from '../types/player'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Playlist } from '../types'

interface PlaylistContextProps {
  playlistList: Playlist[]
  createPlaylist: (m?: Music) => void
  saveToPlaylist: (m: Music) => void
  updatePlaylist: (p: Partial<Playlist>) => void
}

const PlaylistContext = React.createContext<PlaylistContextProps>({
  playlistList: [],
  createPlaylist: () => {},
  saveToPlaylist: () => {},
  updatePlaylist: () => {},
})

export function usePlaylists() {
  return React.useContext(PlaylistContext)
}

export const LOCAL_PREFIX = 'playlist_'

export function getPlaylistMusicsById(id: string): Music[] {
  try {
    const localData = localStorage.getItem(`${LOCAL_PREFIX}${id}`)
    if (localData) {
      return JSON.parse(localData)
    }
  } catch (error) {
    console.error(error, 'getPlaylistMusicsById')
  }
  return []
}

const LOCAL_PLAYLIST = 'playlists'

export function getPlaylistById(id: string): Playlist | undefined {
  try {
    const localData = localStorage.getItem(LOCAL_PLAYLIST)
    if (localData) {
      const playlists = JSON.parse(localData) as Playlist[]
      return playlists.find((p) => p.id === id)
    }
  } catch (error) {
    console.error(error, 'getPlaylistMusicsById')
  }
  return undefined
}

let tmpSaveMusic: Music | undefined = undefined

export const PlaylistProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [playlistList, setPlaylistList] = useLocalStorage<Playlist[]>(
    LOCAL_PLAYLIST,
    []
  )

  const [open, setOpen] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [title, setTitle] = useState('')

  const saveToPlaylist = useCallback((m: Music) => {
    tmpSaveMusic = m
    setSaveOpen(true)
  }, [])

  const createPlaylist = useCallback((m?: Music) => {
    if (m) {
      tmpSaveMusic = m
    }
    setTitle('')
    setOpen(true)
  }, [])

  const updatePlaylist = useCallback(
    (playlist: Partial<Playlist>) => {
      setPlaylistList((l) => {
        const index = l.findIndex((p) => p.id === playlist.id)
        if (index !== -1) {
          return l.toSpliced(index, 1, {
            ...l[index],
            ...playlist,
          })
        }
        return l
      })
    },
    [setPlaylistList]
  )

  const onCreate = () => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      title,
      cover: tmpSaveMusic?.pic || '',
      count: tmpSaveMusic ? 1 : 0,
    }
    setPlaylistList((l) => [newPlaylist, ...l])
    if (tmpSaveMusic) {
      localStorage.setItem(
        `${LOCAL_PREFIX}${newPlaylist.id}`,
        JSON.stringify([tmpSaveMusic])
      )
    }
    setOpen(false)
    setSaveOpen(false)
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlistList,
        createPlaylist,
        saveToPlaylist,
        updatePlaylist,
      }}
    >
      {children}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>收藏到歌单</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <button
              onClick={() => createPlaylist()}
              className="flex items-center gap-2 p-2 rounded hover:bg-secondary"
            >
              <Plus />
              <span>创建新的歌单</span>
            </button>
            {playlistList.map((p) => (
              <button
                className="flex items-center gap-2 p-2 rounded hover:bg-secondary"
                key={p.id}
              >
                {p.title}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建歌单</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入歌单标题(40字以内)"
              maxLength={40}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            ></textarea>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button disabled={title === ''} onClick={onCreate}>
              创 建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PlaylistContext.Provider>
  )
}
