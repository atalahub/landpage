import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */const s="post-root",r="/posts/";function l(){return new URLSearchParams(window.location.search).get("slug")||""}function i(t){return t?new Date(t).toLocaleDateString("pt-BR",{day:"numeric",month:"long",year:"numeric"}):""}async function c(t){const e="/".replace(/\/$/,"")+r+encodeURIComponent(t)+".json",a=await fetch(e);return a.ok?a.json():null}function d(t){const o=i(t.date);return`
    <div class="post-header">
      <a href="blog.html" class="post-back-link">
        <i class="lni lni-arrow-left"></i> Voltar ao Blog
      </a>
      <h1 class="post-title">${n(t.title)}</h1>
      <div class="post-meta">
        <span class="post-date"><i class="lni lni-calendar"></i> ${n(o)}</span>
      </div>
    </div>
    <div class="post-image post-image-placeholder">
      <i class="lni lni-image"></i>
      <span>Imagem do post</span>
    </div>
    <div class="post-body post-body-html">
      ${t.content}
    </div>
    <div class="post-footer">
      <a href="blog.html" class="btn btn-primary">
        <i class="lni lni-arrow-left"></i> Ver todos os posts
      </a>
    </div>
  `}function n(t){const o=document.createElement("div");return o.textContent=t,o.innerHTML}function p(t){document.title=`${t.title} - Blog AtalaHub`;const o=document.querySelector('meta[name="description"]');o&&t.excerpt&&o.setAttribute("content",t.excerpt);const e=document.querySelector('link[rel="canonical"]');if(e){const a=new URL(window.location.href);a.search="",e.href=a.toString()}}async function m(){const t=document.getElementById(s);if(!t)return;const o=l();if(!o){t.innerHTML=`
      <div class="post-header">
        <a href="blog.html" class="post-back-link"><i class="lni lni-arrow-left"></i> Voltar ao Blog</a>
      </div>
      <p class="text-muted">Post não informado. <a href="blog.html">Ver todos os posts</a>.</p>
    `;return}t.innerHTML='<p class="text-muted">Carregando…</p>';try{const e=await c(o);if(!e){t.innerHTML=`
        <div class="post-header">
          <a href="blog.html" class="post-back-link"><i class="lni lni-arrow-left"></i> Voltar ao Blog</a>
        </div>
        <p class="text-muted">Post não encontrado. <a href="blog.html">Ver todos os posts</a>.</p>
      `;return}p(e),t.innerHTML=d(e)}catch(e){console.error(e),t.innerHTML=`
      <div class="post-header">
        <a href="blog.html" class="post-back-link"><i class="lni lni-arrow-left"></i> Voltar ao Blog</a>
      </div>
      <p class="text-danger">Não foi possível carregar o post. <a href="blog.html">Voltar ao blog</a>.</p>
    `}}m();
