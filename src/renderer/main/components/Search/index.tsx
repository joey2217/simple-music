import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AutoComplete, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { fetchSearchKey } from '../../api/top'
import useLocalStorage from '../../hooks/useLocalStorage'

interface Option {
  label?: ReactNode
  value: string
}

type OptionType = { label: string; options: Option[] } | Option

const LOCAL_SEARCH_KEYS = 'local_search_keys'
const MAX_SEARCH_KEY_COUNT = 10

const Search: React.FC = () => {
  const navigate = useNavigate()
  const [value, setValue] = useLocalStorage<string[]>(LOCAL_SEARCH_KEYS, [])

  const [searchKeys, setSearchKeys] = useState<string[]>([])
  const [keyword, setKeyword] = useState('')

  const onSearch = useCallback(
    (searchText: string) => {
      if (searchText !== '') {
        setValue((list: string[]) => [
          searchText,
          ...list
            .slice(0, MAX_SEARCH_KEY_COUNT)
            .filter((s) => s !== searchText),
        ])
      }
      navigate(`/search?q=${searchText}`)
    },
    [navigate, setValue]
  )

  const onSearchKeyClose = useCallback(
    (e: React.MouseEvent<HTMLElement>, val: string) => {
      e.stopPropagation()
      setValue((list: string[]) => list.filter((s) => s !== val))
    },
    [setValue]
  )

  useEffect(() => {
    fetchSearchKey(keyword).then((data) => {
      setSearchKeys(data)
    })
  }, [keyword])

  const options = useMemo<OptionType[]>(() => {
    if (keyword) {
      return searchKeys.map((v) => ({ value: v }))
    } else {
      return [
        {
          label: '历史',
          options: value.map((v) => ({
            value: v,
            label: (
              <div className="flex items-center justify-between">
                <span>{v}</span>
                <CloseOutlined onClick={(e) => onSearchKeyClose(e, v)} />
              </div>
            ),
          })),
        },
        {
          label: '热搜',
          options: searchKeys.map((v) => ({ value: v })),
        },
      ]
    }
  }, [keyword, onSearchKeyClose, searchKeys, value])

  return (
    <AutoComplete
      className="w-1/2 max-w-lg min-w-[200px]"
      options={options}
      onSelect={onSearch}
    >
      <Input.Search
        placeholder="输入关键字搜索"
        enterButton
        allowClear
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={onSearch}
      />
    </AutoComplete>
  )
}

export default memo(Search)
