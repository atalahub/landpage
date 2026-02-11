/**
 * Blog list: carrega posts-data.json e renderiza os cards (lógica baseada no blog de referência).
 */

const BLOG_LIST_ID = 'blog-list'
const POSTS_DATA_URL = '/posts-data.json'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function postUrl(slug) {
  return `post.html?slug=${encodeURIComponent(slug)}`
}

function renderCard(post) {
  const dateFormatted = formatDate(post.date)
  return `
    <div class="col-lg-4 col-md-6 col-12">
      <article class="blog-card">
        <a href="${escapeHtml(postUrl(post.slug))}" class="blog-card-image-wrap">
          <div class="blog-card-image blog-card-image-placeholder">
            <i class="lni lni-image"></i>
          </div>
        </a>
        <div class="blog-card-content">
          <span class="blog-card-date"><i class="lni lni-calendar"></i> ${escapeHtml(dateFormatted)}</span>
          <h2 class="blog-card-title"><a href="${escapeHtml(postUrl(post.slug))}">${escapeHtml(post.title)}</a></h2>
          <p class="blog-card-excerpt">${escapeHtml(post.excerpt || '')}</p>
          <a href="${escapeHtml(postUrl(post.slug))}" class="blog-card-read-more">Ler mais <i class="lni lni-arrow-right"></i></a>
        </div>
      </article>
    </div>
  `
}

async function init() {
  const container = document.getElementById(BLOG_LIST_ID)
  if (!container) return

  container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">Carregando posts…</p></div>'

  try {
    const base = import.meta.env.BASE_URL || '/'
    const res = await fetch(base.replace(/\/$/, '') + POSTS_DATA_URL)
    if (!res.ok) throw new Error('Falha ao carregar posts')
    const posts = await res.json()

    if (!posts || posts.length === 0) {
      container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">Nenhum post publicado ainda.</p></div>'
      return
    }

    container.innerHTML = posts.map((post) => renderCard(post)).join('')
  } catch (err) {
    console.error(err)
    container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-danger">Não foi possível carregar os posts. Tente novamente mais tarde.</p></div>'
  }
}

init()
