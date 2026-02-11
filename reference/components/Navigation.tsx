import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="site clear">
      <ul>
        <li>
          <Link href="/" title="Home">
            Return Home
          </Link>
        </li>
        <li>
          <Link href="/portfolio" title="Portfolio">
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/skills" title="Skills">
            Skills
          </Link>
        </li>
        <li>
          <Link href="/contact" title="Contact">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/lore" title="Lore">
            Lore
          </Link>
        </li>
      </ul>
    </nav>
  )
}

