import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar'
import {Appsidebar} from '@/components/ui/appsidebar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
