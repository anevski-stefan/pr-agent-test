import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Privacy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">© {year} Nexus Inc. All rights reserved.</p>
        <ul className="footer-links">
          {FOOTER_LINKS.map(l => (
            <li key={l.path}>
              <Link to={l.path}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
