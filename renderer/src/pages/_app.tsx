import React, { useEffect, useState } from 'react'
import usePersistedState from '../utils/usePersistedState'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import GlobalStyles from '../styles/global'
import PlayerContextProvider from '../contexts/PlayerContext'
import { ThemeProvider } from 'styled-components'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'
import TabBar from '../components/TabBar'

function MyApp({ Component, pageProps }) {
  const [bottomMode, setBottomMode] = useState(false)
  const [theme, setTheme] = usePersistedState('theme', light)

  const ToggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  useEffect(() => {
    setBottomMode(window.innerWidth <= 1024)
    window.addEventListener('resize', () =>
      setBottomMode(window.innerWidth <= 1024)
    )
    return () => window.removeEventListener('resize', () => {})
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <PlayerContextProvider>
        <div style={{position: 'relative', maxWidth: '100vw'}}>
          <TabBar bottom={bottomMode} />
          <div className={styles.wrapper}>
            <main className={styles.main}>
              <Header toggleTheme={ToggleTheme} />
              <Component {...pageProps} />
              <GlobalStyles />
            </main>
            <Player bottom={bottomMode} />
          </div>
        </div>
      </PlayerContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
