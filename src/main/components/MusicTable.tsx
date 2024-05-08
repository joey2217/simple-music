import React from 'react'
import type { Music } from '../types/player'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePlayerList } from '../store/player'
import ActionCell from './ActionCell'
import { Link } from 'react-router-dom'
import MusicTitleCell from './MusicTitleCell'

interface Props {
  items: Music[]
}

const MusicTable: React.FC<Props> = ({ items }) => {
  const { play } = usePlayerList()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">#</TableHead>
          <TableHead className="max-w-96">标题</TableHead>
          <TableHead>操作</TableHead>
          <TableHead className="max-w-32">专辑</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item.copyrightId} onDoubleClick={() => play(item)}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>
              <MusicTitleCell music={item} />
            </TableCell>
            <TableCell>
              <ActionCell music={item} />
            </TableCell>
            <TableCell title={item.album} className="max-w-32 truncate">
              <Link className="truncate link" to={`/album/${item.albumId}`}>
                {item.album}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MusicTable
