import { useState } from 'react'

const initialFormData = {
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  edad: '',
  servicio: '',
  mensaje: '',
}

function useContactForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [enviando, setEnviando] = useState(false)
  const [mensajeEstado, setMensajeEstado] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextFormData = { ...formData, [name]: value }

    setFormData(nextFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setEnviando(true)
    setMensajeEstado('')

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await respuesta.json()

      if (respuesta.ok) {
        alert('¡Mensaje enviado con éxito!')
        setFormData(initialFormData) // Limpia el formulario
      } else {
        alert(data.error || 'Ocurrió un error al enviar el mensaje.')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error)
      alert('No se pudo conectar con el servidor.')
    } finally {
      setEnviando(false)
    }
  }

  const handleReset = () => {
    setFormData(initialFormData)
    console.log('Formulario reseteado:', initialFormData)
  }

  return {
    formData,
    enviando,
    mensajeEstado,
    handleChange,
    handleReset,
    handleSubmit,
  }
}

export default useContactForm