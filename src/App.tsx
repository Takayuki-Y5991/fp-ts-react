import { ThemeProvider } from '@/components/theme-provider'
import { ReactNode } from 'react'
import './App.css'

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {children}
      <div>Hello World</div>
    </ThemeProvider>
  )
}

export default App
