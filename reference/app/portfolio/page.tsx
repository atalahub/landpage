import PostCard from '@/components/PostCard'
import { getPostsByTag } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio & Case Studies from LACORTE Systems',
}

export default async function PortfolioPage() {
  const portfolioPosts = await getPostsByTag('portfolio')

  return (
    <>
      <h2>Portfolio & Case Studies</h2>

      {portfolioPosts.length > 0 ? (
        portfolioPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))
      ) : (
        <p>No portfolio projects found.</p>
      )}
    </>
  )
}
