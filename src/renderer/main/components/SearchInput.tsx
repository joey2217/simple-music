import React, { useEffect } from 'react'
import { useState } from 'react'
import type { HotWordItem } from '../types/migu'
import { fetchSearchHotWord } from '../api/migu'

interface Props {
  onSearch: (keyword: string) => void
}

const SearchInput: React.FC<Props> = ({
  onSearch: search,
}) => {
  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState(false)
  const [hotWords, setHotWords] = useState<HotWordItem[]>([])

  useEffect(() => {
    fetchSearchHotWord().then((data) => {
      setHotWords(data)
    })
  }, [])

  const onSearch = () => {
    if (keyword !== '') {
      search(keyword)
      setOpen(false)
    }
  }

  const onClick = (word: string) => {
    setKeyword(word)
    onSearch()
  }

  const onBlur = () => {
    setTimeout(() => {
      setOpen(false)
    }, 200)
  }

  return (
    <details className="dropdown" open={open}>
      <summary
        className="join"
       
      >
        <input
          className="join-item input input-sm input-bordered grow"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={onBlur}
        />
        <button className="join-item btn btn-sm btn-primary" onClick={onSearch}>
          搜 索
        </button>
      </summary>
      <ul
        className="p-2 shadow menu dropdown-content z-[100] bg-base-100 rounded-box w-52"
      >
        {hotWords.map((item) => (
          <li key={item.note}>
            <button className="btn btn-sm" onClick={() => onClick(item.word)}>
              {item.word}
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default SearchInput
