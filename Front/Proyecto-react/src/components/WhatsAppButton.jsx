import { useEffect, useMemo, useState } from 'react'
import { brand } from '../data/siteData.js'

function WhatsAppButton() {
  const [isLarge, setIsLarge] = useState(false)
  const href = useMemo(() => {
    const message = encodeURIComponent(brand.whatsappMessage)
    return `https://wa.me/${brand.whatsappNumber}?text=${message}`
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLarge((current) => !current)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <a
      href={href}
      className="whatsapp-button"
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      style={{ transform: isLarge ? 'scale(1.12)' : 'scale(1)' }}
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true" />
    </a>
  )
}

export default WhatsAppButton
