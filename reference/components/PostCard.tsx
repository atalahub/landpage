import Link from 'next/link'
import { PostData } from '@/lib/posts'
import { format } from 'date-fns'

interface PostCardProps {
  post: PostData
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date
    ? format(new Date(post.date), 'MMMM dd, yyyy')
    : ''

  return (
    <article>
      <h3>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>
      {formattedDate && <p>{formattedDate}</p>}
      <p>{post.excerpt}</p>
      {post.tags && post.tags.length > 0 && (
        <p>
          {post.tags.map((tag, index) => (
            <span key={tag}>
              [ {tag} ]{index < post.tags.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      )}
    </article>
  )
}

