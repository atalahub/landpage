import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  try {
    const posts = await getAllPosts()
    
    // Retornar apenas informações básicas
    const postsList = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
    }))

    return NextResponse.json(postsList)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

