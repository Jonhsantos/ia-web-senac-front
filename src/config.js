// Variáveis VITE_ fazem parte do código enviado ao navegador: não use segredos.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '')
