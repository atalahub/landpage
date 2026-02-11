import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'All blog posts from LACORTE Systems',
}

export default async function PostsPage() {
  const allPosts = await getAllPosts()
  const posts = allPosts.slice(0, POSTS_PER_PAGE)
  const hasMore = allPosts.length > POSTS_PER_PAGE
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  return (
    <>
      <h2>All Posts</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}

      {hasMore && (
        <nav className="pagination">
          <Link href="/posts/page/2">Next →</Link>
        </nav>
      )}
    </>
  )
}
