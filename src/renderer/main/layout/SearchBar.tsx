import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { HotWordItem } from '../types/migu'
import { fetchSearchHotWord } from '../api/migu'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

const SearchBar: React.FC = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState(false)
  const [hotWords, setHotWords] = useState<HotWordItem[]>([])

  useEffect(() => {
    fetchSearchHotWord().then((data) => {
      setHotWords(data)
    })
  }, [])

  const onBlur = () => {
    // setTimeout(() => {
    setOpen(false)
    // }, 200)
  }

  const onSearch = () => {
    if (keyword !== '') {
      navigate(`/search?keyword=${keyword}`)
      setOpen(false)
    }
  }

  const onClick = (word: string) => {
    setKeyword(word)
    onSearch()
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-within:outline-none">
          <Input
            value={keyword}
            placeholder="搜索"
            onFocus={() => setOpen(true)}
            onBlur={onBlur}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <ScrollArea className="max-h-content">
            {hotWords.map((w) => (
              <DropdownMenuItem key={w.note} onClick={() => onClick(w.word)}>
                {w.word}
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SearchBar
