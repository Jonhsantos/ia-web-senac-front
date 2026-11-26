import axios from 'axios'
import { API_BASE_URL } from './config.js'

const api = axios.create({ baseURL: API_BASE_URL })

export async function isApiOnline(signal) {
  const { data } = await api.get('/health', { signal, timeout: 8000 })
  return data?.status === 'online'
}

function vehicleFromSource(source) {
  const parts = source.replace(/\.md$/i, '').split(/[_-]+/).filter(Boolean)
  const words = parts.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  const [make, ...model] = words
  return { source, make: model.length ? make : '', model: model.join(' ') || make || source }
}

export async function getKnowledge(signal) {
  const { data } = await api.get('/knowledge', { signal, timeout: 8000 })
  const vehicles = Array.isArray(data?.vehicles) ? data.vehicles : undefined
  const sources = Array.isArray(data?.sources) ? data.sources : undefined
  if (!vehicles && !sources) throw new Error('A API retornou um catálogo inválido.')

  return {
    vehicles: vehicles ?? sources.filter((source) => typeof source === 'string').map(vehicleFromSource),
    suggestions: Array.isArray(data.suggested_questions) ? data.suggested_questions : [],
  }
}

export async function streamQuestion(question, { onDelta, onStatus, signal }) {
  const { data, status, headers } = await api.post('/chat/stream', { question }, {
    adapter: 'fetch',
    responseType: 'stream',
    validateStatus: () => true,
    signal,
  })

  if (status < 200 || status >= 300) {
    const body = await new Response(data).json().catch(() => null)
    throw new Error(body?.detail && typeof body.detail === 'string'
      ? body.detail
      : 'O assistente está indisponível. Tente novamente.')
  }
  if (!headers['content-type']?.includes('application/x-ndjson') || !data?.getReader) {
    await data?.cancel?.().catch(() => {})
    throw new Error('O assistente retornou uma resposta inválida. Tente novamente.')
  }

  const reader = data.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      buffer += done ? decoder.decode() + '\n' : decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()

      for (const line of lines) {
        if (!line.trim()) continue
        const event = JSON.parse(line)
        if (event.type === 'status' && typeof event.stage === 'string') onStatus?.(event.stage)
        if (event.type === 'delta' && typeof event.text === 'string') onDelta(event.text)
        if (event.type === 'done' && typeof event.answer === 'string') return event
        if (event.type === 'error') throw new Error(event.detail)
      }
      if (done) throw new Error('A conexão foi encerrada antes da resposta terminar. Tente novamente.')
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('O assistente retornou uma resposta inválida. Tente novamente.', { cause: error })
    }
    if (error instanceof TypeError && !signal.aborted) {
      throw new Error('A conexão com o assistente foi interrompida. Tente novamente.', { cause: error })
    }
    throw error
  } finally {
    await reader.cancel().catch(() => {})
    reader.releaseLock()
  }
}

export function chatErrorMessage(error) {
  if (!axios.isAxiosError(error)) return error.message
  if (!error.response) return 'Não foi possível conectar ao assistente. Tente novamente.'
  const detail = error.response.data?.detail
  return typeof detail === 'string' ? detail : 'O assistente está indisponível. Tente novamente.'
}
