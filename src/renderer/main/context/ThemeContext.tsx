import React, { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'

export type Theme = 'dark' | 'light'

interface ThemeProps {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = React.createContext<ThemeProps>({
  theme: 'light',
  setTheme: () => {},
})

export function useTheme() {
  return React.useContext(ThemeContext)
}

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getTheme())

  useEffect(() => {
    setLocalTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

const LOCAL_THEME = 'local_theme'

function getTheme(): Theme {
  if (
    localStorage[LOCAL_THEME] === 'dark' ||
    (!(LOCAL_THEME in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
    return 'dark'
  }
  document.documentElement.classList.remove('dark')
  return 'light'
}

function setLocalTheme(theme: Theme) {
  localStorage.setItem(LOCAL_THEME, theme)
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
