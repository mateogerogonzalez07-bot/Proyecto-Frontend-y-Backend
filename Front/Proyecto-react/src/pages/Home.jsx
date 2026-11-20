import Cards from '../components/Cards.jsx'
import { brand, services } from '../data/siteData.js'

function Home() {
  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `linear-gradient(rgba(6, 8, 48, 0.35), rgba(6, 8, 48, 0.35)), url(${brand.hero})` }}
      >
        <div>
          <p>Somos familia</p>
          <h2>Construimos historia</h2>
        </div>
      </section>

      <section className="history-section">
        <div className="section-heading">
          <p>Mas de 10 anos de experiencia</p>
          <h2>Soluciones de calidad para cada espacio</h2>
        </div>
        <p>
          Brindamos soluciones de mantenimiento integral con compromiso,
          confianza y dedicacion. Para nosotros no solo es un trabajo, es una
          pasion que nos impulsa a superar expectativas y construir relaciones
          duraderas.
        </p>
        <p>
          Si buscas compromiso, calidad y confianza, DG-Mantenimiento Integral
          es una opcion preparada para transformar ideas en resultados.
        </p>
      </section>

      <Cards items={services} />
    </>
  )
}

export default Home
