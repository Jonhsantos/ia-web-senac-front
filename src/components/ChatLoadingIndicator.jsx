import AssistantAvatar from './AssistantAvatar.jsx'
import StreamingCar from './StreamingCar.jsx'

const messages = {
  searching: 'Pesquisando na base de conhecimento…',
  consulting: 'Consultando o modelo com os documentos encontrados…',
  retrying: 'Tentando consultar o modelo novamente…',
  fallback: 'Consultando outro modelo…',
}

export default function ChatLoadingIndicator({ stage }) {
  return (
    <div className="assistant-message shrink-0" role="status">
      <AssistantAvatar />
      <div key={stage}
        className="assistant-bubble relative flex min-h-8 items-center overflow-hidden bg-processing p-0 inset-ring-1 inset-ring-primary/15">
        <span className="w-[calc(100%-3.5rem)] py-2 pl-4 text-xs font-medium text-primary motion-safe:animate-car-reveal">
          {messages[stage] ?? messages.searching}
        </span>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-14 items-center text-ink motion-safe:animate-car-drive">
          <StreamingCar className="h-8 w-14" />
        </div>
      </div>
    </div>
  )
}
