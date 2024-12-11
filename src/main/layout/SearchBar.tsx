import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import type { HotWordItem, SearchSuggest } from '../types/migu'
import { fetchSearchHotWord, fetchSearchSuggest } from '../api/migu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useLocalStorage from '../hooks/useLocalStorage'
import { FluentDelete } from '../components/Icons'

const SearchBar: React.FC = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const [hotWords, setHotWords] = useState<HotWordItem[]>([])
  const [searchSuggest, setSearchSuggest] = useState<SearchSuggest>()
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    'search_history',
    []
  )

  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchSearchHotWord().then((data) => {
      setHotWords(data)
    })
  }, [])

  const onSearch = () => {
    if (keyword !== '') {
      setSearchHistory((d) => [
        keyword,
        ...d.filter((s) => s !== keyword).slice(0, 9),
      ])
      navigate(`/search?keyword=${keyword}`)
      setOpen(false)
    }
  }

  const onClick = (word: string) => {
    setKeyword(word)
    if (word !== '') {
      setSearchHistory((d) => [
        word,
        ...d.filter((s) => s !== word).slice(0, 9),
      ])
      navigate(`/search?keyword=${word}`)
    }
  }

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    } else if (e.key === 'Escape') {
      const inputEl = inputRef.current
      if (inputEl) {
        inputEl.blur()
      }
    }
  }

  const onFocus = () => {
    setOpen(true)
  }

  const onBlur = () => {
    setTimeout(() => {
      setOpen(false)
    }, 200)
  }

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setKeyword(text)
    if (text !== '') {
      fetchSearchSuggest(text).then(setSearchSuggest)
    }
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={keyword}
        placeholder="搜索歌曲、歌手"
        onChange={onKeywordChange}
        onFocus={onFocus}
        onKeyDown={onKeydown}
        onBlur={onBlur}
        className="w-80"
      />
      <div
        className={`absolute border  bg-card overflow-hidden z-50 w-full top-9 transition duration-300 rounded-b-md ${
          open ? 'block' : 'hidden'
        }`}
        style={{}}
      >
        {keyword !== '' && searchSuggest ? (
          <div className="p-2 text-left">
            <Button variant="link" onClick={() => onClick(keyword)}>
              搜索{keyword}
            </Button>
            <div>
              {searchSuggest.singers?.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onClick(s.name)}
                  className="hover:bg-accent hover:text-accent-foreground flex p-1 gap-2"
                >
                  <span>{s.name}</span>
                </div>
              ))}
              {searchSuggest.songs?.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onClick(s.name)}
                  className="hover:bg-accent hover:text-accent-foreground flex p-1 gap-2"
                >
                  <span>{s.name}</span>
                </div>
              ))}
              {searchSuggest.albums?.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onClick(s.name)}
                  className="hover:bg-accent hover:text-accent-foreground flex p-1 gap-2"
                >
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-content scrollbar">
            <div className="p-2 text-left">
              {searchHistory.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h4 className="w-full scroll-m-20 text-lg font-semibold tracking-tight">
                      搜索历史
                    </h4>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSearchHistory([])}
                    >
                      <FluentDelete />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {searchHistory.map((s) => (
                      <div
                        key={s}
                        onClick={() => onClick(s)}
                        className="hover:bg-accent hover:text-accent-foreground flex p-1 gap-2 rounded"
                      >
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <h4 className="w-full scroll-m-20 text-lg font-semibold tracking-tight">
                热门搜索
              </h4>
              {hotWords.map((word, index) => (
                <div
                  key={word.id}
                  onClick={() => onClick(word.word)}
                  className="hover:bg-accent hover:text-accent-foreground flex p-1 gap-2"
                >
                  <span className="w-6 text-center">{index + 1}</span>
                  <span>{word.word}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
