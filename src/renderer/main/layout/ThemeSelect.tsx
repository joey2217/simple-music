import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

const LOCAL_THEME = 'local_theme'

function getTheme(): Theme {
  const localData = localStorage.getItem(LOCAL_THEME)
  if (localData != null) {
    return localData as Theme
  }
  return 'system'
}

const DARK_BACK_COLOR = '#0c0a09'

function setLocalTheme(theme: Theme) {
  const root = window.document.documentElement

  root.classList.remove('light', 'dark')
  let systemTheme = theme
  if (theme === 'system') {
    systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  root.classList.add(systemTheme)

  if (systemTheme === 'dark') {
    window.electronAPI.setMainTitleBarOverlay({
      color: DARK_BACK_COLOR,
    })
  } else {
    window.electronAPI.setMainTitleBarOverlay({
      color: '#fff',
    })
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getTheme())

  useEffect(() => {
    setLocalTheme(theme)
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
