import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Skill Tree & Technologies used by LACORTE Systems',
}

export default function SkillsPage() {
  const frontend = [
    'JavaScript & TypeScript',
    'React & React Native',
    'Next.js',
    'Vite',
    'CSS',
  ]

  const backend = [
    'Node.js',
    'NestJS',
    'WordPress (for clients, not for me)',
  ]

  const databases = [
    'MySQL & MariaDB',
    'PostgreSQL',
    'MongoDB',
    'Redis',
  ]

  const testing = [
    'Jest',
    'Mocha',
  ]

  const other = [
    'Markdown',
    'Web Workers & WebAssembly',
  ]

  return (
    <>
      <h2>Skill Tree & Technologies</h2>

      <p>Here&apos;s what I work with. Some I love, some I tolerate, all I use.</p>

      <h3>Frontend & Frameworks</h3>
      <ul>
        {frontend.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3>Backend & APIs</h3>
      <ul>
        {backend.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3>Databases</h3>
      <ul>
        {databases.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3>Testing</h3>
      <ul>
        {testing.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3>Other Stuff</h3>
      <ul>
        {other.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </>
  )
}
