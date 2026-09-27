import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GlobalContextProvider } from './GlobalContext.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </GlobalContextProvider>
  </StrictMode>,
)
