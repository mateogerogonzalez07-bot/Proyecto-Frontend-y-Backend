import Gallery from '../components/Gallery.jsx'
import { projectImages } from '../data/siteData.js'
import {useState, useEffect } from 'react'

function Projects() {
  const [proyectos, setProyectos] = useState ([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(res => res.json())
      .then(data => setProyectos(data))
      .catch(err => console.error("Error al traer proyectos:", err));
  }, []);
  return <Gallery title="Proyectos realizados" images={projectImages} />
}

export default Projects
