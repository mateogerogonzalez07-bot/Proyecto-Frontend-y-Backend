function Gallery({ images, title }) {
  if (!images?.length) {
    return (
      <section className="empty-gallery">
        <h2>{title}</h2>
        <p>Pronto se agregaran imagenes de esta categoria.</p>
      </section>
    )
  }

  return (
    <section className="gallery-section">
      <h2>{title}</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <figure className="gallery-item" key={image.src}>
            <img src={image.src} alt={image.alt} />
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Gallery
