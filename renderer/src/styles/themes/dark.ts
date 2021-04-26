import { shade } from 'polished'

const dark = {
    title: 'dark',
    /*colors: {
        primaryColor: '#9F75FF',
        secondaryColor: '#8257E4',
        background: '#222',
        subBackground: '#333',
        borderColor: '#191919',
        text: '#fff',
        subText: '#aaa',
        description: '#999',
        active: '#04D361'
    }*/
    colors: {
        primaryColor: '#9F75FF',
        secondaryColor: '#8257E4',
        background: shade(.9, '#9F75FF'),
        subBackground: shade(.85, '#9F75FF'),
        borderColor: shade(.95, '#8257E4'),
        text: '#fff',
        subText: '#aaa',
        description: '#999',
        active: '#04D361'
    }
}

export default dark