import { ThemeProvider } from '@/components/theme-provider'
import { ReactRouterProvider } from '@/providers/routes/route-provider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactRouterProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReactRouterProvider>
  </React.StrictMode>
)
