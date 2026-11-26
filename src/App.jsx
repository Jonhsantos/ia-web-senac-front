import { useContext } from 'react'
import { useLoaderData, useRevalidator } from 'react-router'
import ChatPanel from './components/ChatPanel.jsx'
import VehicleList from './components/VehicleList.jsx'
import { RefreshHealthContext } from './healthCheckContext.js'

function App() {
  const knowledge = useLoaderData()
  const { state, revalidate } = useRevalidator()
  const loading = state === 'loading'
  const refreshHealth = useContext(RefreshHealthContext)

  function retryCatalog() {
    refreshHealth()
    revalidate()
  }

  return (
    <main className="workspace">
      <section className="introduction" aria-labelledby="page-title">
        <p className="eyebrow">SEU ASSISTENTE AUTOMOTIVO</p>
        <h1 id="page-title">O que você quer saber sobre seu carro?</h1>
        <p>Tire dúvidas sobre especificações, manutenção e funcionamento.</p>
      </section>

      <div className="workspace-panels">
        <VehicleList vehicles={knowledge?.vehicles ?? []} loading={loading}
          error={!knowledge && !loading} onRetry={retryCatalog} />
        <ChatPanel suggestions={knowledge?.suggestions ?? []} onRetry={refreshHealth} />
      </div>

      <footer className="site-footer">
        <span>INFORMAÇÃO PARA O SEU CAMINHO.</span>
        <span>PROJETO ACADÊMICO  /  SENAC</span>
      </footer>
    </main>
  )
}

export default App
