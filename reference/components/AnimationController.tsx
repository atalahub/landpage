'use client'

import { useEffect } from 'react'

export default function AnimationController() {
  useEffect(() => {
    // This is a backup - the inline script should handle it first
    // But this ensures it works even if the inline script fails
    const wrapper = document.querySelector('.wrapper')
    const content = document.querySelector('.content')
    
    // Ensure content is visible
    if (wrapper && !wrapper.classList.contains('animate')) {
      ;(wrapper as HTMLElement).style.height = '100%'
      ;(wrapper as HTMLElement).style.overflow = 'visible'
    }
    if (content && !content.classList.contains('animate')) {
      ;(content as HTMLElement).style.height = 'auto'
      ;(content as HTMLElement).style.overflow = 'visible'
    }
    
    // Enable animations after a tiny delay
    const enable = () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const w = document.querySelector('.wrapper')
          const c = document.querySelector('.content')
          if (w && !w.classList.contains('animate')) {
            ;(w as HTMLElement).style.height = ''
            ;(w as HTMLElement).style.overflow = ''
            w.classList.add('animate')
          }
          if (c && !c.classList.contains('animate')) {
            ;(c as HTMLElement).style.height = ''
            ;(c as HTMLElement).style.overflow = ''
            c.classList.add('animate')
          }
          document.documentElement.classList.remove('no-animations')
        }, 0.5)
      })
    }
    
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      enable()
    } else {
      window.addEventListener('load', enable, { once: true })
    }
  }, [])
  
  return null
}
