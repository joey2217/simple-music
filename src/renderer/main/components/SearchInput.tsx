import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { FluentSearch, LoadingIcon, RoundClose } from './icons'
import {
  defaultSearchHotKeysState,
  searchValueState,
  searchKeywordState,
} from '../store/atom'
import { searchHotKeysState } from '../store/selector'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchHistory } from '../store/hooks'

interface Props {
  className?: string
  inputStyle?: React.CSSProperties
  top?: number | string
}

const SearchInput: React.FC<Props> = ({ className = '', inputStyle, top }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { setKeywordHistoryData, keywordHistory } = useSearchHistory()
  const [keyword, setKeyword] = useRecoilState(searchKeywordState)
  const [searchValue, setSearchValue] = useRecoilState(searchValueState)
  const defaultSearchHotKeys = useRecoilValue(defaultSearchHotKeysState)
  const searchHotKeysLoadable = useRecoilValueLoadable(searchHotKeysState)

  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)

  const onSearch = useCallback(
    (word?: string) => {
      if (word != null) {
        setSearchValue(word)
        setKeyword(word)
        setKeywordHistoryData(word)
      }
      setOpen(false)
      if (pathname !== '/search') {
        navigate(`/search?keyword=${word}`)
      }
    },
    [navigate, pathname, setKeyword, setKeywordHistoryData, setSearchValue]
  )

  const onBlur = () => {
    setTimeout(() => {
      setOpen(false)
    }, 200)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.code)
    if (e.key === 'Enter') {
      onSearch((e.target as any).value)
    } else if (e.key === 'Escape') {
      const inputEl = inputRef.current
      if (inputEl) {
        inputEl.blur()
      }
    }
  }

  useEffect(() => {
    setSearchValue(keyword)
    setOpen(false)
  }, [keyword, setSearchValue])

  const defaultSearchOptions = useMemo(() => {
    return (
      <div>
        <div className="px-2 py-1 flex items-center gap-4">最近搜索记录</div>
        <ul className="flex flex-wrap gap-1">
          {keywordHistory.map((word) => (
            <li
              key={word}
              className="cursor-pointer py-1 px-2 hover:bg-neutral-500/50 rounded-md flex items-center gap-4"
              onClick={() => onSearch(word)}
            >
              {word}
            </li>
          ))}
        </ul>
        <div className="px-2 py-1">最近热搜</div>
        <ul>
          {defaultSearchHotKeys.map((word, index) => (
            <li
              key={word}
              className="cursor-pointer py-1 px-2 hover:bg-neutral-500/50 rounded-md flex items-center gap-3"
              onClick={() => onSearch(word)}
            >
              <div className="w-6 h-6 text-center bg-indigo-600/80 rounded">
                {index + 1}
              </div>
              <div className="truncate">{word}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }, [defaultSearchHotKeys, keywordHistory, onSearch])

  const searchOptions = useMemo(() => {
    if (searchHotKeysLoadable.state === 'hasValue') {
      return (
        <ul>
          {searchHotKeysLoadable.contents.map((word) => (
            <li
              key={word}
              className="cursor-pointer py-1 px-2 hover:bg-neutral-500/50 rounded-md"
              onClick={() => onSearch(word)}
            >
              {word}
            </li>
          ))}
        </ul>
      )
    }
    if (searchHotKeysLoadable.state === 'loading') {
      return (
        <div className="min-h-[336px] flex justify-center items-center">
          <LoadingIcon className="text-4xl text-indigo-600" />
        </div>
      )
    }
    return null
  }, [onSearch, searchHotKeysLoadable.contents, searchHotKeysLoadable.state])

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex  items-center overflow-hidden px-2 bg-neutral-200 dark:bg-neutral-600 ${
          open ? 'rounded-t-md' : 'rounded-md'
        }`}
      >
        <FluentSearch className="text-xl text-neutral-500 dark:text-neutral-100" />
        <input
          ref={inputRef}
          className={`flex-1 py-2 px-2 sm:text-sm ring-0 bg-neutral-200 dark:bg-neutral-600 focus:outline-none`}
          placeholder="搜索音乐/MV/歌单/歌手"
          style={inputStyle}
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
        <button
          className={`${
            searchValue ? 'flex' : 'hidden'
          } items-center justify-center w-5 h-5 rounded-full  bg-neutral-700/50  hover:bg-neutral-700 text-white text-base`}
          title="清除"
          onClick={() => setSearchValue('')}
        >
          <RoundClose />
        </button>
      </div>
      <div
        className={`absolute overflow-hidden z-50 w-full top-9 bg-neutral-200 dark:bg-neutral-600 transition duration-300 rounded-b-md ${
          open ? 'block' : 'hidden opacity-0'
        }`}
        style={{
          top,
        }}
      >
        <div className="py-2 px-4">
          {searchValue === '' ? defaultSearchOptions : searchOptions}
        </div>
      </div>
    </div>
  )
}

export default memo(SearchInput)
