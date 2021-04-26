import { shade } from 'polished'
import styled from 'styled-components'

export const TabBarContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: transparent;
    width: 100%;
    max-width: 100vw;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
`

interface TabTitleContainerProps {
    isMaximized?: boolean
}

export const TabBarTitleContainer = styled.div<TabTitleContainerProps>`
    flex: 1 1;
    align-self: flex-end;
    height: ${props => props.isMaximized ? '30px' : '26px'};
    background-color: transparent;
    margin-left: ${props => props.isMaximized ? '0' : '4px'};
    -webkit-app-region: drag;
`

interface commandsProps {
    bottomMode?: boolean
}

export const TabBarCommandsContainer = styled.div<commandsProps>`
    width: 128px;
    height: 100%;
    display: flex;
    font-size: 16px;

    > div{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: ${props => props.bottomMode ? 'var(--text)' : '#fff'};

        &:active{
            background-color: ${props => props.bottomMode ? props.theme.title === 'light' ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.05)'} ;
            
        }
    }
`