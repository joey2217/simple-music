import React, { memo, useState } from 'react'
import { theme } from 'antd'

interface Props {
  options: { label: string; value: string | number }[]
  onChange: (value: string | number) => void
}

const Tags: React.FC<Props> = ({ options, onChange }) => {
  const {
    token: { colorBgSpotlight },
  } = theme.useToken()
  const [active, setActive] = useState(options[0]?.value)

  const onClick = (value: string | number) => {
    setActive(value)
    onChange(value)
  }

  return (
    <ul className="flex flex-wrap pl-0">
      {options.map((option) => (
        <li
          className={`list-none py-1 px-2 m-1 h-6 leading-4 min-w-[24px] text-center cursor-pointer ${
            active === option.value ? 'rounded-full' : ''
          }`}
          style={{
            backgroundColor: active === option.value ? colorBgSpotlight : '',
          }}
          key={option.value}
          onClick={() => onClick(option.value)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )
}

export default memo(Tags)
