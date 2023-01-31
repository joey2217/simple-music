import React, { memo, useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { fetchSearchKey } from '../../api/top'

interface StringOption {
  value: string
}

type OptionType = { label: string; options: StringOption[] } | StringOption

const Search: React.FC = () => {
  const navigate = useNavigate()
  const [options, setOptions] = useState<OptionType[]>([])
  const [keyword, setKeyword] = useState('')
  const onSearch = (searchText: string) => {
    navigate(`/search?q=${searchText}`)
  }

  useEffect(() => {
    fetchSearchKey(keyword).then((data) => {
      if (keyword) {
        setOptions(data.map((s) => ({ value: s })))
      } else {
        setOptions([
          {
            label: '历史',
            options: [], //TODO
          },
          {
            label: '热搜',
            options: data.map((s) => ({ value: s })),
          },
        ])
      }
    })
  }, [keyword])

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
