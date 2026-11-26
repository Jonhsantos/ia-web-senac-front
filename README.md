# Assistente Automotivo — Frontend

Interface em React com Tailwind CSS, Axios e React Router. O Vite
executa e compila o projeto.

## Executar

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```bash
npm install
npm run dev
```

A configuração é opcional em desenvolvimento. Para personalizá-la, copie
`.env.example` para `.env` e ajuste os valores:

```env
VITE_API_BASE_URL=/api
API_PROXY_TARGET=http://127.0.0.1:8000
```

Acesse o endereço exibido no terminal (normalmente http://localhost:5173).
Para usar a API, inicie também o backend conforme o README do projeto
`ia-web-senac`; por padrão, ele usa http://127.0.0.1:8000.

Durante o desenvolvimento, o Vite encaminha requisições de `/api` para o
backend, removendo o prefixo: por exemplo, `/api/chat` corresponde a
`http://127.0.0.1:8000/chat`. A tela carrega os modelos e as perguntas
sugeridas de `GET /knowledge` e abre o stream de respostas em `POST /chat/stream`.
O carro aparece enquanto o chat aguarda o primeiro trecho. A resposta é exibida
à medida que chega, com opção de parar ou tentar novamente em caso de falha.
Para versões da API que retornam somente `sources`, a interface deriva os
nomes dos veículos dos arquivos Markdown e exibe sugestões quando fornecidas.

O proxy funciona apenas no servidor de desenvolvimento do Vite. Em produção,
configure um proxy equivalente no servidor que hospeda o frontend ou defina
`VITE_API_BASE_URL` como a URL pública do backend antes de executar
`npm run build`. Nesse último caso, o backend deve permitir a origem do
frontend via CORS. Variáveis `VITE_` são públicas e incorporadas ao build:
nunca coloque chaves ou senhas nelas. Alterações exigem um novo build.

O cliente Axios em `src/api.js` usa `API_BASE_URL` de `src/config.js`.
O React Router carrega o catálogo ao abrir a rota principal. Os componentes
da interface ficam em `src/components/`.

## Outros comandos

```bash
npm run lint
npm run build
npm run preview
```
