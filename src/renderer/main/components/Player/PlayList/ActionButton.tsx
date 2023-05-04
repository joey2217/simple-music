import React, { memo } from 'react'
import type { PropsWithChildren, ButtonHTMLAttributes } from 'react'

const ActionButton: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={`rounded-full hover:ring-1 hover:text-indigo-600 flex justify-center items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default memo(ActionButton)
