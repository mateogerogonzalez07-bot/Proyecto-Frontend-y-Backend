import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

function Layout() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="inicio" className="site-main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Layout
