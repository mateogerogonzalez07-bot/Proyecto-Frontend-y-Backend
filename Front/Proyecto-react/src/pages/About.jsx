import { aboutBlocks } from '../data/siteData.js'

function About() {
  return (
    <section className="about-page">
      <div className="section-heading">
        <p>Sobre nosotros</p>
        <h2>Una empresa enfocada en soluciones integrales</h2>
      </div>

      <p className="about-intro">
        Somos una empresa dedicada a brindar soluciones integrales, enfocandonos
        en la calidad, la confianza y la satisfaccion de cada cliente.
      </p>

      <div className="about-grid">
        {aboutBlocks.map((block) => (
          <article className="about-card" key={block.title}>
            <h3>{block.title}</h3>
            <p>{block.text}</p>
          </article>
        ))}
      </div>

      <div className="map-card">
        <h3>Ubicacion</h3>
        <iframe
          title="Ubicacion DG"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6521.45307437862!2d-59.09249471428574!3d-35.18836778571428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1781455550560!5m2!1ses!2sar"
          width="600"
          height="360"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}

export default About
