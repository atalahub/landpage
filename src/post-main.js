/**
 * Post single: lê slug da URL, carrega /posts/[slug].json e renderiza o artigo (lógica baseada no blog de referência).
 */

const POST_ROOT_ID = 'post-root'
const POSTS_BASE = '/posts/'

function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('slug') || ''
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function loadPost(slug) {
  const base = import.meta.env.BASE_URL || '/'
  const url = base.replace(/\/$/, '') + POSTS_BASE + encodeURIComponent(slug) + '.json'
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

function renderPost(post) {
  const dateFormatted = formatDate(post.date)
  return `
    <div class="post-header">
      <a href="blog.html" class="post-back-link">
        <i class="lni lni-arrow-left"></i> Voltar ao Blog
      </a>
      <h1 class="post-title">${escapeHtml(post.title)}</h1>
      <div class="post-meta">
        <span class="post-date"><i class="lni lni-calendar"></i> ${escapeHtml(dateFormatted)}</span>
      </div>
    </div>
    <div class="post-image post-image-placeholder">
      <i class="lni lni-image"></i>
      <span>Imagem do post</span>
    </div>
    <div class="post-body post-body-html">
      ${post.content}
    </div>
    <div class="post-footer">
      <a href="blog.html" class="btn btn-primary">
        <i class="lni lni-arrow-left"></i> Ver todos os posts
      </a>
    </div>
  `
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function updateDocumentMeta(post) {
  document.title = `${post.title} - Blog AtalaHub`
  const desc = document.querySelector('meta[name="description"]')
  if (desc && post.excerpt) desc.setAttribute('content', post.excerpt)
  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    const url = new URL(window.location.href)
    url.search = ''
    canonical.href = url.toString()
  }
}

async function init() {
  const container = document.getElementById(POST_ROOT_ID)
  if (!container) return

  const slug = getSlugFromUrl()
  if (!slug) {
    container.innerHTML = `
      <div class="post-header">
        <a href="blog.html" class="post-back-link"><i class="lni lni-arrow-left"></i> Voltar ao Blog</a>
      </div>
      <p class="text-muted">Post não informado. <a href="blog.html">Ver todos os posts</a>.</p>
    `
    return
  }

  container.innerHTML = '<p class="text-muted">Carregando…</p>'

  try {
    const post = await loadPost(slug)
    if (!post) {
      container.innerHTML = `
        <div class="post-header">
          <a href="blog.html" class="post-back-link"><i class="lni lni-arrow-left"></i> Voltar ao Blog</a>
        </div>
        <p class="text-muted">Post não encontrado. <a href="blog.html">Ver todos os posts</a>.</p>
      `
      return
    }

    updateDocumentMeta(post)
    container.innerHTML = renderPost(post)
  } catch (err) {
    console.error(err)
    container.innerHTML = `
      <div class="post-header">
        <a href="blog.html" class="post-back-link"><i class="lni lni-arrow-left"></i> Voltar ao Blog</a>
      </div>
      <p class="text-danger">Não foi possível carregar o post. <a href="blog.html">Voltar ao blog</a>.</p>
    `
  }
}

init()
