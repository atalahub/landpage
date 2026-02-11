import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */const o="blog-list",i="/posts-data.json";function l(e){return e?new Date(e).toLocaleDateString("pt-BR",{day:"numeric",month:"short",year:"numeric"}):""}function a(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function n(e){return`post.html?slug=${encodeURIComponent(e)}`}function d(e){const t=l(e.date);return`
    <div class="col-lg-4 col-md-6 col-12">
      <article class="blog-card">
        <a href="${a(n(e.slug))}" class="blog-card-image-wrap">
          <div class="blog-card-image blog-card-image-placeholder">
            <i class="lni lni-image"></i>
          </div>
        </a>
        <div class="blog-card-content">
          <span class="blog-card-date"><i class="lni lni-calendar"></i> ${a(t)}</span>
          <h2 class="blog-card-title"><a href="${a(n(e.slug))}">${a(e.title)}</a></h2>
          <p class="blog-card-excerpt">${a(e.excerpt||"")}</p>
          <a href="${a(n(e.slug))}" class="blog-card-read-more">Ler mais <i class="lni lni-arrow-right"></i></a>
        </div>
      </article>
    </div>
  `}async function p(){const e=document.getElementById(o);if(e){e.innerHTML='<div class="col-12 text-center py-5"><p class="text-muted">Carregando posts…</p></div>';try{const c=await fetch("/".replace(/\/$/,"")+i);if(!c.ok)throw new Error("Falha ao carregar posts");const r=await c.json();if(!r||r.length===0){e.innerHTML='<div class="col-12 text-center py-5"><p class="text-muted">Nenhum post publicado ainda.</p></div>';return}e.innerHTML=r.map(s=>d(s)).join("")}catch(t){console.error(t),e.innerHTML='<div class="col-12 text-center py-5"><p class="text-danger">Não foi possível carregar os posts. Tente novamente mais tarde.</p></div>'}}}p();
