'use client'

import { useEffect, useState } from 'react'

export function useLastConnection() {
  const [lastConnection, setLastConnection] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let stored = localStorage.getItem('lastConnection')
    
    if (stored === null) {
      const lastLogin = new Date()
      const formattedDate = lastLogin.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/(\d{1,2}:\d{2}:\d{2})/, '$1')
      
      localStorage.setItem('lastConnection', formattedDate)
      stored = formattedDate
    }

    setLastConnection(stored)
    
    // Atualizar com a data atual
    const now = new Date().toLocaleString()
    localStorage.setItem('lastConnection', now)
  }, [])

  return lastConnection
}

