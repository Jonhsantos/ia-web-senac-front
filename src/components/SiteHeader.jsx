import { useEffect, useState } from 'react'
import { isApiOnline } from '../api.js'

const indicators = {
  checking: {
    label: 'Verificando a API',
    style: '[--health-color:var(--color-yellow-400)] motion-safe:animate-health-check',
  },
  online: { label: 'API online', style: '[--health-color:var(--color-success)]' },
  offline: { label: 'API indisponível', style: '[--health-color:var(--color-error)]' },
}

export default function SiteHeader({ refreshKey }) {
  const [health, setHealth] = useState('checking')

  useEffect(() => {
    const controller = new AbortController()

    async function checkHealth() {
      setHealth('checking')
      let online = false
      try {
        online = await isApiOnline(controller.signal)
      } catch {
        // Um timeout ou erro de rede indica que a API está indisponível.
      }
      if (controller.signal.aborted) return

      setHealth(online ? 'online' : 'offline')
    }

    checkHealth()
    return () => {
      controller.abort()
    }
  }, [refreshKey])

  const { style, label } = indicators[health]

  return (
    <header className="site-header">
      <div className="brand">
        <img src="/logo-auto-ia.svg" width="38" height="38" alt="" />
        <span>AUTO IA  /  ASSISTENTE</span>
      </div>
      <span className={`knowledge-badge group ${style}`} tabIndex={0}>
        <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-[color:var(--health-color)]" />
        BASE DE CONHECIMENTO
        <span className="sr-only">. {label}</span>
        <span aria-hidden="true"
          className="pointer-events-none absolute top-full right-0 z-20 translate-y-1.5 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium tracking-normal text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
          {label}
        </span>
      </span>
    </header>
  )
}
