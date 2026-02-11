import { ReactNode } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="wrapper">
      <div className="content clearfix">
        <Header />
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

