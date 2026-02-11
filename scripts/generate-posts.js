import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const postsDir = path.join(projectRoot, 'content', 'posts')
const publicDir = path.join(projectRoot, 'public')
const postsDataPath = path.join(publicDir, 'posts-data.json')
const postsOutDir = path.join(publicDir, 'posts')

function getAllPostSlugs() {
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

async function getPostBySlug(slug) {
  const fullPath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processed = await remark().use(remarkHtml).process(content)
  const contentHtml = String(processed)
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content: contentHtml,
    tags: data.tags || [],
  }
}

async function getAllPosts() {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  )
  const valid = posts.filter((p) => p !== null)
  valid.sort((a, b) => (a.date < b.date ? 1 : -1))
  return valid
}

async function main() {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }
  fs.mkdirSync(publicDir, { recursive: true })
  fs.mkdirSync(postsOutDir, { recursive: true })

  const posts = await getAllPosts()
  const listData = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    tags: p.tags,
  }))

  fs.writeFileSync(postsDataPath, JSON.stringify(listData, null, 2), 'utf8')
  for (const post of posts) {
    fs.writeFileSync(
      path.join(postsOutDir, `${post.slug}.json`),
      JSON.stringify(post, null, 2),
      'utf8'
    )
  }
  console.log(`Generated posts-data.json (${posts.length} posts) and individual post JSONs.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
