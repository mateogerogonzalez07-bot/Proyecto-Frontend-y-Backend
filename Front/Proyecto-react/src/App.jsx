import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import About from './pages/About.jsx'
import ContactPage from './pages/ContactPage.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ServiceGalleryPage from './pages/ServiceGalleryPage.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'; // (Ajustá la ruta según dónde lo hayas guardado)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<About />} />
          <Route path="proyectos" element={<Projects />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="servicios/:serviceId" element={<ServiceGalleryPage />} />
          <Route path="/login" element={<Login />}/>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
           {/* La nueva ruta para el admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="html/nosotros.html" element={<Navigate to="/nosotros" replace />} />
          <Route path="html/proyectos.html" element={<Navigate to="/proyectos" replace />} />
          <Route path="html/contacto.html" element={<Navigate to="/contacto" replace />} />
          <Route path="html/pintura.html" element={<Navigate to="/servicios/pintura" replace />} />
          <Route path="html/construcciones.html" element={<Navigate to="/servicios/construccion" replace />} />
          <Route path="html/singueria.html" element={<Navigate to="/servicios/singueria" replace />} />
          <Route path="html/electricidad.html" element={<Navigate to="/servicios/electricidad" replace />} />
          <Route path="html/plomeria.html" element={<Navigate to="/servicios/plomeria" replace />} />
          <Route path="html/revestimientos-durlock.html" element={<Navigate to="/servicios/revestimientos" replace />} />
          </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
