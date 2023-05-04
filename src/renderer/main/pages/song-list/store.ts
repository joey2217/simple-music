import { atom, selector } from 'recoil'
import {
  fetchRcmPlaylist,
  fetchSongListTags,
  fetchTagPlaylist,
} from '../../api/songList'
import { PageData } from '../../types'
import type { SongListItem, SongListTag } from '../../types/songList'

export const songListTagsState = atom<SongListTag[]>({
  key: 'songListTagsState',
  default: fetchSongListTags(),
})

type OrderId = 'new' | 'hot'

export interface TagParam {
  type: 'order' | 'id'
  id: OrderId | string
}

export const HOT_TAGS: { label: string; value: OrderId }[] = [
  {
    label: '最新',
    value: 'new',
  },
  {
    label: '最热',
    value: 'hot',
  },
]

export const currentTagState = atom<TagParam>({
  key: 'currentTagState',
  default: {
    type: 'order',
    id: 'new',
  },
})

export const songListPageState = atom({
  key: 'songListPageState',
  default: 1,
})

export const songListState = selector<PageData<SongListItem>>({
  key: 'songListState',
  get: ({ get }) => {
    const page = get(songListPageState)
    const tag = get(currentTagState)
    if (tag.type === 'order') {
      return fetchRcmPlaylist(tag.id, { pn: page })
    } else {
      return fetchTagPlaylist(tag.id, { pn: page })
    }
  },
})
