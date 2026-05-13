import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { NavLink as NavLinkType } from '../types'

const NAV_LINKS: NavLinkType[] = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-logo">⬡</span>
        <span className="brand-name">Nexus</span>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        <NavLink to="/pricing" className="btn-outline">Get Started</NavLink>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
