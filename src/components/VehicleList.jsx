import { useId } from 'react'
import Icon from './Icon.jsx'

export default function VehicleList({ vehicles, loading, error, onRetry }) {
  const titleId = useId()

  return (
    <aside className="vehicle-panel" aria-labelledby={titleId}>
      <div className="vehicle-heading">
        <h2 id={titleId}><Icon name="car" size={17} />Modelos disponíveis</h2>
        <p>Explore os veículos da base de conhecimento.</p>
      </div>
      <hr />
      {loading && <p role="status">Carregando modelos…</p>}
      {error && (
        <div className="vehicle-status">
          <p role="alert">Não foi possível carregar os modelos.</p>
          <button type="button" onClick={onRetry}>Tentar novamente</button>
        </div>
      )}
      {!loading && !error && vehicles.length === 0 && (
        <p>Nenhum modelo está disponível na base de conhecimento.</p>
      )}
      {vehicles.length > 0 && (
        <>
          <ul className="vehicle-list">
            {vehicles.map(({ source, model, make }) => (
              <li key={source}>
                <Icon name="car" size={17} />
                <div><strong>{model}</strong>{make && <span>{make}</span>}</div>
              </li>
            ))}
          </ul>
          <p>Mencione o modelo na sua pergunta.</p>
        </>
      )}
    </aside>
  )
}
