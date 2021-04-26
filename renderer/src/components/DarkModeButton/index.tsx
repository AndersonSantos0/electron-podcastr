import React, { useEffect, useState } from 'react'
import { FaMoon, FaRegMoon } from 'react-icons/fa'
import { ButtonContainer } from './style'

interface DarkModeSwitcherProps {
  theme: string
  toggleTheme: () => void
}

const DarkModeSwitcher: React.FC<DarkModeSwitcherProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <ButtonContainer onClick={toggleTheme}>
      <FaMoon size={'1.5rem'} color={'var(--description)'} />
    </ButtonContainer>
  )
}

export default DarkModeSwitcher
