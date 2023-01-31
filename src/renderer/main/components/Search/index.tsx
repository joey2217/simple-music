import React, { memo, useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { fetchSearchKey } from '../../api/top'

const Search: React.FC = () => {
  const navigate = useNavigate()
  const [options, setOptions] = useState<{ value: string }[]>([])
  const [keyword, setKeyword] = useState('')
  const onSearch = (searchText: string) => {
    navigate(`/search?q=${searchText}`)
  }

  useEffect(() => {
    fetchSearchKey(keyword).then((data) => {
      setOptions(data.map((s) => ({ value: s })))
    })
  }, [keyword])

  return (
    <AutoComplete
      className="w-1/2 max-w-lg min-w-[200px]"
      options={options}
      onSelect={onSearch}
    >
      <Input.Search
        placeholder="input here"
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
