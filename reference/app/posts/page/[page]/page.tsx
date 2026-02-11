import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'All blog posts from LACORTE Systems',
}

interface PageProps {
  params: {
    page: string
  }
}

export default async function PostsPagePaginated({ params }: PageProps) {
  const pageNumber = parseInt(params.page, 10)
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  
  if (pageNumber > totalPages) {
    notFound()
  }

  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)

  return (
    <>
      <h2>All Posts - Page {pageNumber}</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}

      <nav className="pagination">
        {pageNumber > 1 && (
          <Link href={pageNumber === 2 ? "/posts" : `/posts/page/${pageNumber - 1}`}>
            ← Previous
          </Link>
        )}
        {pageNumber < totalPages && (
          <Link href={`/posts/page/${pageNumber + 1}`}>
            Next →
          </Link>
        )}
      </nav>
    </>
  )
}
