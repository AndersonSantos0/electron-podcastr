import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root{
        --primary: ${props => props.theme.colors.primaryColor};
        --secondary: ${props => props.theme.colors.secondaryColor};
        --border: ${props => props.theme.colors.borderColor};
        --background: ${props => props.theme.colors.background};
        --subBackground: ${props => props.theme.colors.subBackground};
        --text: ${props => props.theme.colors.text};
        --subText: ${props => props.theme.colors.subText};
        --description: ${props => props.theme.colors.description};
        --active: ${props => props.theme.colors.active};
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: var(--background);
        transition: .2s background-color;
    }

    body, input, textarea, button{
        font: 500 1rem Inter, sans-serif;
        color: var(--subText);
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        font-family: Lexend, sans-serif;
        color: var(--text);
        transition: .2s color;
    }

    h1{
        font-size: 2rem;
    }

    h2{
        font-size: 1.5rem;
    }

    button {
        cursor: pointer;
        outline: none;
    }
`
