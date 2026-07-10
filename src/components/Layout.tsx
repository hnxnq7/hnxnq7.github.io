import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../theme'
import './Layout.css'

const links = [
  { to: '/', label: 'about' },
  { to: '/journey', label: 'journey' },
  { to: '/built', label: 'fun things I’ve built' },
]

function Layout() {
  const { theme, toggle } = useTheme()

  return (
    <div className="shell">
      <nav className="nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.label}
          </NavLink>
        ))}
        <button
          type="button"
          className="theme-toggle"
          onClick={toggle}
          aria-label="toggle day and night theme"
        >
          {theme === 'night' ? '☾' : '☼'}
        </button>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
