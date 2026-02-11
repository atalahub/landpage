'use client'

import { useEffect } from 'react'

export function useProbabilityWorker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const failedAttempts = parseFloat(
      localStorage.getItem('failedAttempts') || '0'
    )

    const worker = new Worker('/assets/js/probability_worker.js')

    worker.onmessage = (e) => {
      const result = e.data
      if (result) {
        localStorage.setItem('failedAttempts', String(failedAttempts + 1))
        alert('Failed connection attempt.')
      }
    }

    worker.postMessage('check')

    return () => {
      worker.terminate()
    }
  }, [])
}

