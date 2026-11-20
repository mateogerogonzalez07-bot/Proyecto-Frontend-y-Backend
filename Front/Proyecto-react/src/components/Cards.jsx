import { useState } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../data/siteData.js'

function Cards({ items }) {
  const [selectedCard, setSelectedCard] = useState(null)

  return (
    <section className="Cards cards-grid" aria-label="Servicios">
      {items.map((item) => {
        const isSelected = selectedCard === item.id

        return (
          <article className={`Card service-card ${isSelected ? 'opaco selected' : ''}`} key={item.id}>
            <div className="encabezado-Card">
              <img className="img-Card" src={brand.logo} alt={`Logo DG - ${item.title}`} />
            </div>
            <div className="cuerpo-Card service-card-body">
              <h3 className="nombre">{item.title}</h3>
              <p className="service-subtitle">{item.subtitle}</p>
              <p className="descripcion">{item.description}</p>
            </div>
            <div className="container-icons card-actions">
              <Link
                to={`/servicios/${item.id}`}
                className="btn-primary primary-link"
                onClick={() => setSelectedCard(item.id)}
              >
                Ver Mas
              </Link>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Cards
