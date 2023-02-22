import React, { memo, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AutoComplete, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { fetchSearchKey } from '../../api/top'
import useLocalStorage from '../../hooks/useLocalStorage'

interface Option {
  value: ReactNode
}

type OptionType = { label: string; options: Option[] } | Option

const LOCAL_SEARCH_KEYS = 'local_search_keys'

const Search: React.FC = () => {
  const navigate = useNavigate()
  const { value, setValue } = useLocalStorage<string[]>(LOCAL_SEARCH_KEYS, [])

  const [searchKeys, setSearchKeys] = useState<string[]>([])
  const [keyword, setKeyword] = useState('')

  const onSearch = (searchText: string) => {
    if (searchText !== '') {
      setValue((list: string[]) => [
        searchText,
        ...list.filter((s) => s !== searchText),
      ])
    }
    navigate(`/search?q=${searchText}`)
  }

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
          options: value.map((v) => ({ value: v })),
        },
        {
          label: '热搜',
          options: searchKeys.map((v) => ({ value: v })),
        },
      ]
    }
  }, [keyword, searchKeys, value])

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
