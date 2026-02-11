'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: string
  name: string
  comment: string
  date: string
}

interface CommentsProps {
  postSlug: string
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [postSlug])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postSlug=${postSlug}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postSlug,
          name,
          comment,
        }),
      })

      if (response.ok) {
        setName('')
        setComment('')
        fetchComments()
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name &gt;&gt;</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Comment &gt;&gt;</label>
        <textarea
          name="comment"
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Submit" disabled={submitting} />
      </form>

      {comments.map((comment) => (
        <p key={comment.id}>
          <strong>{comment.name}:</strong> {comment.comment}
        </p>
      ))}
    </>
  )
}

