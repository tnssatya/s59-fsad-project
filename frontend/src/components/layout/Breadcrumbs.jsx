import { Link, useLocation } from 'react-router-dom'

function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)

  if (!parts.length) return null

  return (
    <nav className="mb-4 text-sm text-slate-500 dark:text-slate-400">
      <Link to="/">Home</Link>
      {parts.map((part, index) => {
        const to = `/${parts.slice(0, index + 1).join('/')}`
        const label = part.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
        const last = index === parts.length - 1

        return (
          <span key={to}>
            {' / '}
            {last ? label : <Link to={to}>{label}</Link>}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs