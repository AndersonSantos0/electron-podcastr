import React, { useEffect, useState } from 'react'
import { ipcRenderer, remote } from 'electron'
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from 'react-icons/vsc'
import {
  TabBarCommandsContainer,
  TabBarContainer,
  TabBarTitleContainer,
} from './style'

interface TabBarProps {
  bottom?: boolean
}

const TabBar: React.FC<TabBarProps> = ({ bottom }) => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    remote?.getCurrentWindow().on('maximize', () => setIsMaximized(true))
    remote?.getCurrentWindow().on('unmaximize', () => setIsMaximized(false))

    return () => {
      remote?.getCurrentWindow().removeAllListeners()
    }
  }, [])

  const CloseWindow = () => {
    ipcRenderer?.send('close')
  }
  const MinimizeWindow = () => {
    ipcRenderer?.send('minimize')
  }
  const MaximizeWindow = () => {
    ipcRenderer?.send('maximize')
  }

  return (
    <TabBarContainer>
      <TabBarTitleContainer isMaximized={isMaximized} />
      <TabBarCommandsContainer bottomMode={bottom}>
        <div onClick={MinimizeWindow}>
          <VscChromeMinimize />
        </div>
        <div onClick={MaximizeWindow}>
          {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
        </div>
        <div onClick={CloseWindow}>
          <VscChromeClose />
        </div>
      </TabBarCommandsContainer>
    </TabBarContainer>
  )
}

export default TabBar
