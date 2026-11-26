import { useCallback, useState } from 'react'
import { RouterProvider } from 'react-router/dom'
import { RefreshHealthContext } from '../healthCheckContext.js'
import SiteHeader from './SiteHeader.jsx'

export default function AppShell({ router }) {
  const [healthCheck, setHealthCheck] = useState(0)
  const refreshHealth = useCallback(() => {
    setHealthCheck((check) => check + 1)
  }, [])

  return (
    <RefreshHealthContext.Provider value={refreshHealth}>
      <SiteHeader refreshKey={healthCheck} />
      <RouterProvider router={router} />
    </RefreshHealthContext.Provider>
  )
}
