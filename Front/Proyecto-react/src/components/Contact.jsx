import useContactForm from '../hooks/useContactForm.js'

const services = [
  'Pintura',
  'Electricidad',
  'Construccion',
  'Plomeria',
  'Singueria',
  'Revestimientos',
]

function Contact() {
  const { formData, handleChange, handleReset, handleSubmit } = useContactForm()

  return (
    <section className="contact-section">
      <div className="section-heading">
        <p>Contacto</p>
        <h2>Contanos que servicio necesitas</h2>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
        </label>

        <label>
          Apellido
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
          />
        </label>

        <label>
          Telefono
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Telefono"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@ejemplo.com"
          />
        </label>

        <label>
          Edad
          <input
            type="number"
            name="edad"
            min="1"
            max="100"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Edad"
          />
        </label>

        <fieldset>
          <legend>Servicio</legend>
          <div className="radio-grid">
            {services.map((service) => (
              <label key={service}>
                <input
                  type="radio"
                  name="servicio"
                  value={service}
                  checked={formData.servicio === service}
                  onChange={handleChange}
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="full-field">
          Mensaje
          <textarea
            name="mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Mensaje"
          />
        </label>

        <div className="form-actions">
          <button type="reset" className="secondary-button">
            Resetear
          </button>
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </div>
      </form>
    </section>
  )
}

export default Contact
