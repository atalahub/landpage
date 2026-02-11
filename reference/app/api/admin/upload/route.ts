import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

function sanitizeFilename(filename: string): string {
  const name = filename.replace(/\.md$/, '')
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      )
    }

    if (!file.name.endsWith('.md')) {
      return NextResponse.json(
        { error: 'Apenas arquivos .md são permitidos' },
        { status: 400 }
      )
    }

    const fileContent = await file.text()

    let frontMatter
    try {
      const parsed = matter(fileContent)
      frontMatter = parsed.data
      
      if (!frontMatter.title) {
        return NextResponse.json(
          { error: 'O arquivo deve conter um campo "title" no front matter' },
          { status: 400 }
        )
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Erro ao processar front matter do arquivo' },
        { status: 400 }
      )
    }

    const slug = frontMatter.slug || sanitizeFilename(frontMatter.title || file.name)

    const filePath = path.join(postsDirectory, `${slug}.md`)
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Já existe um post com o slug "${slug}". Use um título diferente.` },
        { status: 400 }
      )
    }

    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json(
      {
        success: true,
        slug,
        message: `Post "${slug}" criado com sucesso!`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error uploading post:', error)
    return NextResponse.json(
      { error: 'Erro ao processar o arquivo', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

