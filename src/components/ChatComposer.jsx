import { useId } from 'react'
import Icon from './Icon.jsx'

export default function ChatComposer({ inputRef, value, busy, onChange, onSend, onStop }) {
  const noteId = useId()

  function submit(event) {
    event.preventDefault()
    onSend(value)
  }

  return (
    <form className="composer" onSubmit={submit}>
      <div className="question-field">
        <input ref={inputRef} aria-label="Sua pergunta" aria-describedby={noteId}
          placeholder="Digite sua pergunta sobre um veículo..." value={value}
          onChange={(event) => onChange(event.target.value)} required minLength={3} maxLength={1000} />
        {busy ? (
          <button className="send-button" type="button" onClick={onStop}>
            Parar
          </button>
        ) : (
          <button className="send-button" type="submit">
            Enviar <Icon name="send" size={15} />
          </button>
        )}
      </div>
      <p id={noteId}>As respostas são geradas a partir da base de conhecimento disponível.</p>
    </form>
  )
}
