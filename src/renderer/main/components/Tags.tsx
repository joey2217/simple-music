import React, { memo, useState } from 'react'

interface Props {
  defalutValue?: string | number 
  options: { label: string; value: string | number }[]
  onChange: (value: string | number) => void
}

const Tags: React.FC<Props> = ({ options, onChange, defalutValue }) => {
  const [active, setActive] = useState(defalutValue || options[0]?.value)

  const onClick = (value: string | number) => {
    setActive(value)
    onChange(value)
  }

  return (
    <ul className="flex flex-wrap my-1 gap-1">
      {options.map((option) => (
        <li
          className={`list-none py-1 px-2 h-6 leading-4 min-w-[24px] text-center cursor-pointer rounded-full ${
            active === option.value
              ? 'bg-indigo-600 hover:bg-indigo-600/80'
              : 'hover:bg-gray-500/50'
          }`}
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
