import React, { memo, useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { fetchSearchKey } from '../../api/top'

const Search: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([])
  const onSearch = (searchText: string) => {
    console.log(searchText)
  }

  useEffect(() => {
    fetchSearchKey().then((data) => {
      setOptions(data.map((s) => ({ value: s })))
    })
  }, [])

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
        onSearch={onSearch}
      />
    </AutoComplete>
  )
}

export default memo(Search)
