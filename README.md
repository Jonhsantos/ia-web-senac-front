# Assistente Automotivo — Frontend

Interface do assistente automotivo em React com Tailwind CSS, Axios e React
Router. Consulta o catálogo e recebe as respostas em streaming do backend
[ia-web-senac](https://github.com/Jonhsantos/ia-web-senac).

## Executar

Use Node.js 20.19 ou superior na série 20, ou Node.js 22.12 ou superior, com npm.
Inicie primeiro o backend conforme o README dele. Por padrão, a API local
escuta em `http://127.0.0.1:8000`.

```bash
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente <http://localhost:5173>.

## Configuração

A configuração local é opcional. Para mudar os valores abaixo, copie
`.env.example` para `.env` e reinicie o Vite.

| Variável | Padrão | Uso |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `/api` | Prefixo ou URL da API no navegador. |
| `API_PROXY_TARGET` | `http://127.0.0.1:8000` | Destino do proxy de desenvolvimento. |

O Vite remove o prefixo `/api` ao encaminhar as chamadas. Por exemplo,
`/api/chat/stream` chega ao backend como `POST /chat/stream`.
Variáveis `VITE_*` são públicas e entram no build. A chave do Gemini fica no
`.env` do backend.

## Como o chat funciona

- A rota inicial carrega modelos e perguntas sugeridas em `GET /knowledge`.
  Se a API só retornar `sources`, a interface deriva os nomes dos arquivos.
- Antes do primeiro trecho, o chat mostra a etapa enviada pelo backend,
  como pesquisa na base, consulta ao modelo ou fallback. O carro revela o
  texto do balão de espera e estaciona no fim de cada passagem. A preferência
  por movimento reduzido desativa a animação.
- Depois do primeiro evento `delta`, a resposta cresce no balão padrão. O
  evento `done` conclui a resposta e entrega a fonte, quando disponível.
- **Parar** cancela a requisição e preserva o texto já recebido. Em caso de
  falha, **Tentar novamente** reenvia a pergunta.

O cliente Axios usa `ReadableStream` e decodificação incremental de UTF-8
para ler o NDJSON de `POST /chat/stream`.

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `src/main.jsx` | React Router e carregamento do catálogo. |
| `src/App.jsx` | Estrutura da página e estados do catálogo. |
| `src/api.js` e `src/config.js` | Cliente Axios, leitura do stream e endereço do backend. |
| `src/components/` | Catálogo, chat, formulário e indicador de espera. |
| `src/index.css` e `src/App.css` | Tema Tailwind, estilos e animações. |

## Build e publicação

Em produção, configure o servidor para encaminhar `/api` ao backend sem
buffering na rota de streaming, ou defina `VITE_API_BASE_URL` com a URL
pública da API antes do build. No segundo caso, permita a origem do
frontend no CORS do backend. Mudanças nas variáveis `VITE_*` exigem um
novo build.

Hospede a pasta `dist/` e configure o servidor para entregar `index.html`
nas rotas da interface. O comando `preview` serve para conferir o build
localmente.

```bash
npm run lint
npm run build
npm run preview
```

## Solução de problemas

| Sintoma | O que verificar |
| --- | --- |
| Modelos não carregam | Confirme que o backend responde em `/health` e `/knowledge` e que a porta bate com `API_PROXY_TARGET`. |
| O chat responde com `404` | Confira se a versão do backend oferece `POST /chat/stream`. |
| O texto chega todo de uma vez | Confira se o proxy de produção está armazenando a resposta em buffer antes de repassar o stream. |
| O chat exibe erro de geração | Verifique a chave do Gemini no backend e acompanhe no terminal as entradas com o mesmo `[chat <id>]`. |
