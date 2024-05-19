import { ReactNode } from 'react'
import './App.css'

interface AppProps {
    children?: ReactNode
}

function App({ children }: AppProps) {
    return <div>Hello World</div>
}

export default App
