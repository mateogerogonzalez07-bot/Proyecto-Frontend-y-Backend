import { Link } from 'react-router-dom'
import { brand, navItems } from '../data/siteData.js'

function Footer() {
  return (
    <footer id="final" className="site-footer">
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>
              <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p>&copy; 2026 {brand.name}. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
