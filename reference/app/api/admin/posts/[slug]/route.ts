import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

// Garantir que o diretório existe
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const filePath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    return NextResponse.json({
      slug,
      content: fileContent,
    })
  } catch (error) {
    console.error('Error reading post:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const filePath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    fs.unlinkSync(filePath)
    
    return NextResponse.json({
      success: true,
      message: `Post "${slug}" deleted successfully`,
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const filePath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    fs.writeFileSync(filePath, content, 'utf8')
    
    return NextResponse.json({
      success: true,
      message: `Post "${slug}" updated successfully`,
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

