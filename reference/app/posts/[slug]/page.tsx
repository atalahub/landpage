import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import Comments from '@/components/Comments'
import type { Metadata } from 'next'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = post.date
    ? format(new Date(post.date), 'MMMM dd, yyyy')
    : ''

  return (
    <>
      <h1>{post.title}</h1>
      {formattedDate && <p>{formattedDate}</p>}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.tags && post.tags.length > 0 && (
        <p>
          Tags:{' '}
          {post.tags.map((tag, index) => (
            <span key={tag}>
              [ {tag} ]{index < post.tags.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      )}

      <h3>Comments</h3>
      <Comments postSlug={params.slug} />
    </>
  )
}

