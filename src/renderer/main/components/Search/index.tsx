import React, { memo, useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import netease from '../../api/netease'

const Search: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([])
  const onSearch = (searchText: string) => {
    console.log(searchText)
  }

  useEffect(() => {
    netease.fetchHotSearch().then((data) => {
      console.log(data)
      setOptions(data.map((w) => ({ value: w })))
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
