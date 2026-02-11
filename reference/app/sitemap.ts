import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import fs from 'fs'
import path from 'path'

const POSTS_PER_PAGE = 5

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.lacorte.dev'
  const postsDirectory = path.join(process.cwd(), 'content', 'posts')

  // Get all posts with their metadata
  const posts = await getAllPosts()
  
  // Create post URLs with dynamic lastModified based on file modification date
  const postUrls = posts.map((post) => {
    const filePath = path.join(postsDirectory, `${post.slug}.md`)
    let lastModified = new Date()
    
    // Try to get file modification date, fallback to post date or current date
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        lastModified = stats.mtime
      } else if (post.date) {
        lastModified = new Date(post.date)
      }
    } catch (error) {
      // If we can't get file stats, use post date or current date
      if (post.date) {
        lastModified = new Date(post.date)
      }
    }

    return {
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  // Create pagination URLs for posts
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paginationUrls = []
  
  // Add /posts page (first page)
  paginationUrls.push({
    url: `${baseUrl}/posts`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  })

  // Add pagination pages (page/2, page/3, etc.)
  for (let page = 2; page <= totalPages; page++) {
    paginationUrls.push({
      url: `${baseUrl}/posts/page/${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lore`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  return [...staticPages, ...paginationUrls, ...postUrls]
}

