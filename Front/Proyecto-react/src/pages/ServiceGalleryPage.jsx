import { Link, useParams } from 'react-router-dom'
import Gallery from '../components/Gallery.jsx'
import { serviceGalleries, services } from '../data/siteData.js'

function ServiceGalleryPage() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)

  if (!service) {
    return (
      <section className="service-detail-page">
        <h2>Servicio no encontrado</h2>
        <Link to="/">Volver al inicio</Link>
      </section>
    )
  }

  const images = serviceGalleries[service.id] ?? []

  return (
    <section className="service-detail-page">
      <div className="section-heading">
        <p>{service.subtitle}</p>
        <h2>{service.title}</h2>
      </div>
      <p className="service-detail-copy">{service.description}</p>
      <Gallery title={`Galeria de ${service.title}`} images={images} />
    </section>
  )
}

export default ServiceGalleryPage
