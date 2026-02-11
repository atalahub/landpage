# Landpage AtalaHub

Site estático com Vite. O blog é alimentado por arquivos Markdown em `content/posts/`, na mesma lógica do blog de referência (listagem e post por slug).

## Desenvolvimento

```bash
npm install
npm run dev
```

O script `build:posts` roda antes do dev e gera `public/posts-data.json` e `public/posts/[slug].json` a partir dos `.md`.

## Build

```bash
npm run build
```

Gera a pasta `dist/` com todas as páginas. A index e as demais páginas (sobre, contato, FAQ, etc.) não foram alteradas em conteúdo; apenas o blog e a página de post usam os dados gerados dos markdowns.

## Blog (Markdown)

- **Listagem:** `blog.html` carrega `/posts-data.json` e renderiza os cards via `src/blog-main.js`.
- **Post:** `post.html?slug=nome-do-arquivo` carrega `/posts/nome-do-arquivo.json` e exibe título, data e conteúdo HTML via `src/post-main.js`.

### Adicionar post

1. Crie um arquivo em `content/posts/meu-post.md`.
2. Use frontmatter no topo:

```yaml
---
title: "Título do post"
date: "2025-01-20"
excerpt: "Resumo curto para a listagem."
tags: ["tag1", "tag2"]
---

Conteúdo em **Markdown** aqui.
```

1. Rode `npm run build:posts` (ou `npm run dev` / `npm run build`, que já executam esse passo).

Os posts são ordenados por data (mais recente primeiro).
