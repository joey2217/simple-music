import React, { memo, SVGProps } from 'react'
import { useTheme } from '../context/ThemeContext'

function IcOutlineDarkMode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4c.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7c0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26a5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
      ></path>
    </svg>
  )
}

function IcOutlineWbSunny(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407l-1.79 1.79l-1.407-1.408zm-1.8 15.115l1.79 1.8l1.41-1.41l-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41l1.79-1.8l-1.41-1.41z"
      ></path>
    </svg>
  )
}

const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <span
      className="text-2xl cursor-pointer p-2 flex justify-center items-center text-indigo-600 rounded hover:text-indigo-600/80"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <IcOutlineDarkMode /> : <IcOutlineWbSunny />}
    </span>
  )
}

export default memo(ThemeButton)
