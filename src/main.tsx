import { ThemeProvider } from '@/components/theme-provider'
import { ReactRouterProvider } from '@/providers/routes/route-provider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <ReactRouterProvider />
        </ThemeProvider>
    </React.StrictMode>,
)
