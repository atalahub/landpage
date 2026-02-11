import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  const currentDate = new Date().toUTCString()
  
  return (
    <>
      <pre>{`$ cd /www/lacorte.dev
$ ls -la
total 42
drwxr-xr-x  5 root  www  4096 Jan 13 10:00 .
drwxr-xr-x  3 root  www  4096 Jan  1 00:00 ..
-rw-r--r--  1 root  www   512 Jan  1 00:00 index.html
drwxr-xr-x  2 root  www  4096 Jan  1 00:00 posts
drwxr-xr-x  2 root  www  4096 Jan  1 00:00 portfolio
-rw-r--r--  1 root  www   256 Jan  1 00:00 robots.txt

$ cat /www/lacorte.dev/404.txt
cat: /www/lacorte.dev/404.txt: No such file or directory

$ echo $?
1

$ curl -I https://www.lacorte.dev/this-page-does-not-exist
HTTP/1.1 404 Not Found
Server: nginx/1.24.0
Date: ${currentDate}
Content-Type: text/html
Content-Length: 0

$ exit 404
`}</pre>
      <h2>404 - File Not Found</h2>
      <p><code>error: page not found</code></p>
      <p>The page you are looking for does not exist in this directory.</p>
      <p><strong>Possible causes:</strong></p>
      <ul>
        <li>The file was moved or deleted</li>
        <li>The URL was typed incorrectly</li>
        <li>The link pointing to this page is broken</li>
        <li>You don&apos;t have permission to access this resource</li>
      </ul>
      <p><strong>Try:</strong></p>
      <ul>
        <li>Check the URL for typos</li>
        <li>Go back to the <Link href="/">homepage</Link> and navigate from there</li>
        <li>Use <code>ls</code> to list available pages: <Link href="/posts">/posts</Link>, <Link href="/portfolio">/portfolio</Link></li>
        <li>Check your permissions: <code>chmod +r /www/lacorte.dev/*</code></li>
      </ul>
      <p>
        <Link href="/">cd ~</Link> | <Link href="/posts">cd /posts</Link> | <code>man 404</code>
      </p>
    </>
  )
}
