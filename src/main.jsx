import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate } from 'react-router'
import { getKnowledge } from './api.js'
import './index.css'
import './App.css'
import App from './App.jsx'
import AppShell from './components/AppShell.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    HydrateFallback: () => <p className="p-6 text-muted-ink" role="status">Carregando modelos…</p>,
    async loader({ request }) {
      try {
        return await getKnowledge(request.signal)
      } catch (error) {
        if (request.signal.aborted) throw error
        return null
      }
    },
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppShell router={router} />
  </StrictMode>,
)
