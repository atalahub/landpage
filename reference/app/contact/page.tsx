'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <h2>Contact</h2>
      {submitted ? (
        <p>Thank you for your message! We will get back to you soon.</p>
      ) : (
        <>
          <p>Fill out the fields below and press SUBMIT:</p>

          <form onSubmit={handleSubmit}>
            <label>Name &gt;&gt;</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <br />
            <label>Email &gt;&gt;</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <label>Phone &gt;&gt;</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <br />
            <label>Subject &gt;&gt;</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <br />
            <label>Message &gt;&gt;</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <br />
            <input type="submit" value="Submit" disabled={submitting} />
            <Link className="button" href="/">
              Cancel
            </Link>
          </form>
        </>
      )}
    </>
  )
}
