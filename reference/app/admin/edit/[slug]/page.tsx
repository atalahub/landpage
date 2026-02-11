'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setContent(data.content)
      } else {
        setMessage('Erro ao carregar post')
      }
    } catch (error) {
      setMessage('Erro ao carregar post')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        setMessage('Post salvo com sucesso!')
        setTimeout(() => {
          router.push('/admin')
        }, 1500)
      } else {
        const data = await response.json()
        setMessage(data.error || 'Erro ao salvar post')
      }
    } catch (error) {
      setMessage('Erro ao salvar post')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <h2>Edit Post: {slug}</h2>
      <p>
        <a href="/admin" onClick={(e) => { e.preventDefault(); router.push('/admin') }}>
          [ Voltar para Admin ]
        </a>
      </p>

      <form onSubmit={handleSave}>
        <label>Content &gt;&gt;</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          required
          style={{ fontFamily: 'monospace', fontSize: '0.9em' }}
        />
        <br />
        <input
          type="submit"
          value={saving ? 'Saving...' : 'Save Post'}
          disabled={saving}
        />
        <a
          className="button"
          href="/admin"
          onClick={(e) => {
            e.preventDefault()
            router.push('/admin')
          }}
        >
          Cancel
        </a>
      </form>

      {message && (
        <p style={{ color: message.includes('sucesso') ? '#0d0' : 'red' }}>
          {message}
        </p>
      )}
    </>
  )
}

