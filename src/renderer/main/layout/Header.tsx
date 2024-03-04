import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Location, Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeSelect'
import icon from '../assets/icon.png'

interface History {
  length: number
  index: number
  location?: Location
}

const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [historyState, setHistoryState] = useState<History>({
    length: 0,
    index: 0,
    location: undefined,
  })

  useEffect(() => {
    const {
      length,
      state: { idx },
    } = window.history
    setHistoryState({
      length,
      index: idx,
      location,
    })
    // console.log(window.history)
  }, [location])

  return (
    <header id="titleBarContainer">
      <div id="titleBar" className="pr-2 flex gap-2 items-center">
        <Link to="/" className="border-r w-44 h-10 flex items-center gap-2 justify-center">
          <img src={icon} alt="logo" className="w-8 h-8" />
          <span>轻·音乐</span>
        </Link>
        <Button
          title="后退"
          size="sm"
          variant="outline"
          disabled={historyState.index === 0}
          onClick={() => navigate(-1)}
        >
          ❮
        </Button>
        <Button
          variant="outline"
          size="sm"
          title="前进"
          disabled={historyState.index === historyState.length - 1}
          onClick={() => navigate(1)}
        >
          ❯
        </Button>
        <SearchBar />
        <div className="flex-1 h-full draggable"></div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
