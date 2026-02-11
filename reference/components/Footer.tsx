'use client'

import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const emailInputId = 'newsletter-email'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <p>&copy; {currentYear} LACORTE Systems</p>

      <h3>Subscribe to Our Newsletter</h3>
      {submitted ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor={emailInputId}>Email &gt;&gt;</label>
          <input
            id={emailInputId}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input type="submit" value="Subscribe" />
        </form>
      )}
    </footer>
  )
}

