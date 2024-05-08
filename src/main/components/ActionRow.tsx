import React from 'react'
import type { Music } from '../types/player'

type Action =
  | 'play'
  | 'append2PlayerList'
  | 'add2Playlist'
  | 'download'
  | 'like'

interface Props {
  actions: Action[]
  music: Music
}

const ActionRow: React.FC<Props> = ({ actions, music }) => {
  return <div>ActionRow</div>
}

export default ActionRow
