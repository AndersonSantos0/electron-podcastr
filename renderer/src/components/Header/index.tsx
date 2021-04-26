import React, { useContext } from 'react'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './styles.module.scss'
import Link from 'next/link'
import { ThemeContext } from 'styled-components'
import DarkModeSwitcher from '../DarkModeButton'
import Logo from '../Logo'
import { useRouter } from 'next/router'

interface HeaderProps {
  toggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const router = useRouter()

  const { title } = useContext(ThemeContext)

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return (
    <header className={styles.headerContainer}>
      <Logo onCLick={() => router.push('/')} />
      <p>O melhor para você ouvir sempre</p>
      <div>
        <span>{currentDate}</span>
        <DarkModeSwitcher theme={title} toggleTheme={toggleTheme} />
      </div>
    </header>
  )
}
