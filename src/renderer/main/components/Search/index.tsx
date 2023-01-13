import React, { memo, useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import netcase from '../../musicResource/netcase'

const Search: React.FC = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { label: '1', value: '1' },
  ])
  const onSearch = (searchText: string) => {
    console.log(searchText)
  }

  const onSelect = (data: string) => {
    console.log('onSelect', data)
  }

  useEffect(() => {
    netcase.fetchHotSearch().then((data) => {
      console.log(data)
    })
  }, [])

  return (
    <AutoComplete
      className="w-1/2 max-w-lg min-w-[200px]"
      options={options}
      onSelect={onSelect}
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
