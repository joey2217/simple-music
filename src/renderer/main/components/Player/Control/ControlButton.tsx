import React, { memo } from 'react'
import type { PropsWithChildren, ButtonHTMLAttributes } from 'react'

const ControlButton: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={`p-1.5 rounded-full enabled:hover:text-indigo-600 flex justify-center items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default memo(ControlButton)
