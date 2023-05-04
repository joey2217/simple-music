import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-2xl text-indigo-600 hover:text-indigo-600/90">
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
      >
        <path
          d="M742.3 100.3l-25.6 44.3c126.2 73 204.7 208.9 204.7 354.6 0 225.7-183.6 409.3-409.3 409.3S102.8 724.8 102.8 499.1c0-145.7 78.4-281.5 204.7-354.6l-25.6-44.3c-142 82.1-230.2 235-230.2 398.8 0 253.9 206.6 460.5 460.5 460.5S972.6 753 972.6 499.1c0-163.9-88.2-316.7-230.3-398.8z"
          fill="currentColor"
        ></path>
        <path
          d="M464.2 437l-25.6-44.3c-45.3 26.2-73.5 75-73.5 127.3 0 81 65.9 147 147 147s147-65.9 147-147v-6.3L451.2 115.4h164V64.2H366.8l241 461.8c-3.1 50.1-44.8 89.9-95.6 89.9-52.8 0-95.8-43-95.8-95.8-0.1-34.1 18.2-66 47.8-83.1z"
          fill="currentColor"
        ></path>
      </svg>
      <h1 className="text-xl truncate text-black hover:text-gray-900/90 dark:text-white dark:hover:text-gray-100/90">轻·音乐</h1>
    </Link>
  )
}

export default memo(Logo)
