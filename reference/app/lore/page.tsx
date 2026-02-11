import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lore',
  description: 'Learn about LACORTE OS and LACORTE Industries',
}

export default function LorePage() {
  return (
    <>
      <h1>LACORTE OS - A History of Security and Innovation</h1>
      <p>
        LACORTE OS, a creation of LACORTE Industries, is a revolutionary
        operating system designed for extreme security and user experience. The
        OS integrates cutting-edge technology, making it the future of secure
        computing. Built on the principles of privacy and data integrity, LACORTE
        OS has a long history of overcoming challenges.
      </p>
      <Link href="/">Back to Home</Link>
    </>
  )
}
