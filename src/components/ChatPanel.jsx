import { useEffect, useId, useRef, useState } from 'react'
import { chatErrorMessage, streamQuestion } from '../api.js'
import AssistantMessage from './AssistantMessage.jsx'
import ChatComposer from './ChatComposer.jsx'
import ChatLoadingIndicator from './ChatLoadingIndicator.jsx'
import Icon from './Icon.jsx'
import SuggestedQuestions from './SuggestedQuestions.jsx'

export default function ChatPanel({ suggestions }) {
  const titleId = useId()
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)
  const [partial, setPartial] = useState('')
  const [stage, setStage] = useState('searching')
  const request = useRef(null)
  const transcript = useRef(null)
  const input = useRef(null)
  const options = useRef(null)

  useEffect(() => () => request.current?.abort(), [])

  useEffect(() => {
    const log = transcript.current
    log.scrollTop = messages.length ? log.scrollHeight : 0
  }, [messages, busy, partial])

  async function sendQuestion(value) {
    const text = value.trim()
    if (text.length < 3 || request.current) return

    const controller = new AbortController()
    request.current = controller
    setMessages((current) => [...current, { kind: 'question', text }])
    setQuestion('')
    setPartial('')
    setStage('searching')
    setBusy(true)
    input.current.focus()

    let received = ''
    try {
      const data = await streamQuestion(text, {
        signal: controller.signal,
        onStatus(nextStage) {
          if (!controller.signal.aborted) setStage(nextStage)
        },
        onDelta(delta) {
          if (controller.signal.aborted) return
          received += delta
          setPartial(received)
        },
      })
      if (controller.signal.aborted) throw controller.signal.reason
      setMessages((current) => [...current, { kind: 'answer', text: data.answer, source: data.source }])
    } catch (error) {
      if (request.current === controller) {
        const updates = []
        if (received) updates.push({ kind: 'answer', text: received })
        if (!controller.signal.aborted) {
          updates.push({ kind: 'error', text: chatErrorMessage(error), question: text })
        }
        if (updates.length) setMessages((current) => [...current, ...updates])
      }
    } finally {
      if (request.current === controller) {
        request.current = null
        setPartial('')
        setBusy(false)
      }
    }
  }

  function resetConversation() {
    request.current?.abort()
    request.current = null
    setBusy(false)
    setPartial('')
    setMessages([])
    setQuestion('')
    options.current.open = false
    input.current.focus()
  }

  return (
    <section className="chat" aria-labelledby={titleId}>
      <header className="chat-header">
        <span className="chat-avatar"><Icon name="sparkles" size={19} /></span>
        <div className="chat-identity">
          <h2 id={titleId}>Assistente automotivo</h2>
          <p>Respostas com base nos documentos</p>
        </div>
        <details ref={options} className="chat-options">
          <summary aria-label="Mais opções"><Icon name="options" size={20} /></summary>
          <button type="button" onClick={resetConversation}>Nova conversa</button>
        </details>
      </header>
      <div className="transcript" role="log" aria-label="Mensagens da conversa" ref={transcript}>
        <AssistantMessage>
          <strong>Olá! Como posso ajudar?</strong>
          <p>Pergunte sobre um veículo presente na nossa base. Vou buscar a informação nos documentos disponíveis.</p>
        </AssistantMessage>
        {messages.length === 0 && (
          <SuggestedQuestions questions={suggestions} onSelect={sendQuestion} />
        )}
        {messages.map((message, index) => message.kind === 'question' ? (
          <p key={index} className="user-bubble message-bubble">{message.text}</p>
        ) : (
          <AssistantMessage key={index} source={message.source} error={message.kind === 'error'}>
            <p>{message.text}</p>
            {message.kind === 'error' && (
              <button type="button" disabled={busy} onClick={() => sendQuestion(message.question)}
                className="message-retry">
                Tentar novamente
              </button>
            )}
          </AssistantMessage>
        ))}
        {busy && (partial ? (
          <AssistantMessage>
            <p>{partial}</p>
          </AssistantMessage>
        ) : <ChatLoadingIndicator stage={stage} />)}
      </div>
      <ChatComposer inputRef={input} value={question} busy={busy}
        onChange={setQuestion} onSend={sendQuestion} onStop={() => request.current?.abort()} />
    </section>
  )
}
