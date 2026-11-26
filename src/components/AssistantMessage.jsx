import AssistantAvatar from './AssistantAvatar.jsx'

export default function AssistantMessage({ children, source, error }) {
  return (
    <div className="assistant-message">
      <AssistantAvatar />
      <div className="assistant-bubble">
        <div className={error ? 'message-error' : undefined}>{children}</div>
        {source && <small className="message-source">Fonte: {source}</small>}
      </div>
    </div>
  )
}
