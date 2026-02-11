import { resolve } from 'path'

export default {
  root: '.',
  publicDir: 'public',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        post: resolve(__dirname, 'post.html'),
        'sobre-nos': resolve(__dirname, 'sobre-nos.html'),
        'fale-conosco': resolve(__dirname, 'fale-conosco.html'),
        faq: resolve(__dirname, 'faq.html'),
        carreiras: resolve(__dirname, 'carreiras.html'),
        imprensa: resolve(__dirname, 'imprensa.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        'termos-uso': resolve(__dirname, 'termos-uso.html'),
        'politica-privacidade': resolve(__dirname, 'politica-privacidade.html'),
        lgpd: resolve(__dirname, 'lgpd.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
}
