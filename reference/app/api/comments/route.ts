import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { put, list, del } from '@vercel/blob'

const commentsDirectory = path.join(process.cwd(), 'data', 'comments')

let useBlobStorage: boolean | null = null

function checkFilesystemAccess(): boolean {
  if (useBlobStorage !== null) {
    return !useBlobStorage
  }
  
  try {
    if (!fs.existsSync(commentsDirectory)) {
      fs.mkdirSync(commentsDirectory, { recursive: true })
    } 
    const testFile = path.join(commentsDirectory, '.test')
    fs.writeFileSync(testFile, 'test')
    fs.unlinkSync(testFile)
    useBlobStorage = false
    return true
  } catch (error) {
    console.warn('Filesystem is read-only, using Vercel Blob storage')
    useBlobStorage = true
    return false
  }
}

interface Comment {
  id: string
  postSlug: string
  name: string
  comment: string
  date: string
}

function getCommentsFilePath(postSlug: string): string {
  return path.join(commentsDirectory, `${postSlug}.json`)
}

function getBlobKey(postSlug: string): string {
  return `comments/${postSlug}.json`
}

async function readComments(postSlug: string): Promise<Comment[]> {
  const useBlob = !checkFilesystemAccess()
  
  if (useBlob) {
    try {
      const blobKey = getBlobKey(postSlug)
      const blobs = await list({ prefix: blobKey })
      const blob = blobs.blobs.find(b => b.pathname === blobKey)
      
      if (!blob) {
        return []
      }
      
      const response = await fetch(blob.url)
      const data = await response.text()
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading comments from Blob:', error)
      return []
    }
  } else {
    const filePath = getCommentsFilePath(postSlug)
    if (!fs.existsSync(filePath)) {
      return []
    }
    try {
      const data = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading comments:', error)
      return []
    }
  }
}

async function writeComments(postSlug: string, comments: Comment[]): Promise<boolean> {
  const useBlob = !checkFilesystemAccess()
  
  if (useBlob) {
    try {
      const blobKey = getBlobKey(postSlug)
      const content = JSON.stringify(comments, null, 2)

      try {
        const blobs = await list({ prefix: blobKey })
        const existingBlob = blobs.blobs.find(b => b.pathname === blobKey)
        if (existingBlob) {
          await del(existingBlob.url)
        }
      } catch (error) {
        // Ignore if blob doesn't exist
      }
      
      await put(blobKey, content, {
        access: 'public',
        contentType: 'application/json',
      })
      return true
    } catch (error) {
      console.error('Error writing comments to Blob:', error)
      return false
    }
  } else {
    try {
      const filePath = getCommentsFilePath(postSlug)
      fs.writeFileSync(filePath, JSON.stringify(comments, null, 2))
      return true
    } catch (error) {
      console.error('Error writing comments:', error)
      return false
    }
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postSlug = searchParams.get('postSlug')

  if (!postSlug) {
    return NextResponse.json(
      { error: 'postSlug is required' },
      { status: 400 }
    )
  }

  const comments = await readComments(postSlug)
  return NextResponse.json(comments)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postSlug, name, comment } = body

    if (!postSlug || !name || !comment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const comments = await readComments(postSlug)
    const newComment: Comment = {
      id: Date.now().toString(),
      postSlug,
      name,
      comment,
      date: new Date().toISOString(),
    }

    comments.push(newComment)
    const written = await writeComments(postSlug, comments)

    if (!written) {
      return NextResponse.json(
        { error: 'Failed to save comment' },
        { status: 500 }
      )
    }

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('Error processing comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

