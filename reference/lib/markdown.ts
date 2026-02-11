import { remark } from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content: contentHtml,
    tags: data.tags || [],
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug)
      return post
    })
  )

  return posts
    .filter((post): post is PostData => post !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
}

export function getPostsByTag(tag: string): Promise<PostData[]> {
  return getAllPosts().then((posts) =>
    posts.filter((post) => post.tags.includes(tag))
  )
}

