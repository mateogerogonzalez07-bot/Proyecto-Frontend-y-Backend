import { NavLink } from 'react-router-dom'
import { brand, navItems } from '../data/siteData.js'

function Navbar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand-link" aria-label="Ir al inicio">
        <img src={brand.logo} alt="Logo DG" />
        <h1>{brand.name}</h1>
      </NavLink>

      <nav aria-label="Navegacion principal">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                end={item.to === '/'}
              >
                <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : undefined)}>
             <i className="fa-solid fa-user" aria-hidden="true" />
              <span>Login</span>
            </NavLink>
          </li>

          <li>
            <a href="#final">
              <i className="fa-solid fa-arrow-down" aria-hidden="true" />
              <span>Ir al final</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
