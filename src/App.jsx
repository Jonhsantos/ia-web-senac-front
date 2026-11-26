import { useLoaderData, useRevalidator } from 'react-router'
import ChatPanel from './components/ChatPanel.jsx'
import VehicleList from './components/VehicleList.jsx'

function App() {
  const knowledge = useLoaderData()
  const { state, revalidate } = useRevalidator()
  const loading = state === 'loading'

  return (
    <>
      <header className="site-header">
        <div className="brand">
          <img src="/logo-auto-ia.svg" width="38" height="38" alt="" />
          <span>AUTO IA  /  ASSISTENTE</span>
        </div>
        <span className="knowledge-badge">BASE DE CONHECIMENTO</span>
      </header>

      <main className="workspace">
        <section className="introduction" aria-labelledby="page-title">
          <p className="eyebrow">SEU ASSISTENTE AUTOMOTIVO</p>
          <h1 id="page-title">O que você quer saber sobre seu carro?</h1>
          <p>Tire dúvidas sobre especificações, manutenção e funcionamento.</p>
        </section>

        <div className="workspace-panels">
          <VehicleList vehicles={knowledge?.vehicles ?? []} loading={loading}
            error={!knowledge && !loading} onRetry={revalidate} />
          <ChatPanel suggestions={knowledge?.suggestions ?? []} />
        </div>

        <footer className="site-footer">
          <span>INFORMAÇÃO PARA O SEU CAMINHO.</span>
          <span>PROJETO ACADÊMICO  /  SENAC</span>
        </footer>
      </main>
    </>
  )
}

export default App
