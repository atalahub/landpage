# LACORTE Systems Blog

Um blog React/Next.js inspirado no terminal do Fallout.

## Características

- Design retro inspirado em terminal Fallout
- Posts em Markdown
- Sistema de comentários
- Formulários de contato e newsletter
- Web Workers e WebAssembly
- Animações CSS personalizadas
- SEO otimizado

## Tecnologias

- Next.js
- React 18
- TypeScript
- Markdown
- date-fns

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Adicione um logo (opcional):

Coloque uma imagem `logo.png` em `public/assets/images/`

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de Pastas

```
blog/
├── app/                   # Páginas
│   ├── api/               # API
│   └── ...
├── components/            # Componentes
├── content/               # Posts em Markdown
│   └── posts/
├── hooks/                 # Hooks
├── lib/                   # Utilitários
├── public/                # Assets
│   └── assets/
│       ├── js/           # JavaScript
│       ├── wasm/         # WebAssembly
│       └── images/       # Imagens
└── styles/               # CSS
```

## Criando Posts

Crie um arquivo Markdown em `content/posts/` com o seguinte formato:

```markdown
---
title: "Título do Post"
date: "2025-01-15"
excerpt: "Resumo do post"
tags: ["tag1", "tag2"]
---

Conteúdo do post em Markdown...
```

## API

### `/api/contact`
POST - Envia formulário de contato

### `/api/newsletter`
POST - Inscreve email na newsletter

### `/api/comments`
GET - Busca comentários de um post
POST - Adiciona comentário a um post

## Notas

- Atualize o domínio em `app/sitemap.ts` e `app/robots.ts`
- Configure serviços de email para formulários (SendGrid, Resend, etc.)
- Adicione um logo em `public/assets/images/logo.png`

## Licença

MIT

