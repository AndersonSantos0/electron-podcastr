import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,
        colors: {
            primaryColor: string
            secondaryColor: string
            borderColor: string
            description: string
            background: string
            subBackground: string
            text: string
            subText: string
            active: string
        }
    }
}
