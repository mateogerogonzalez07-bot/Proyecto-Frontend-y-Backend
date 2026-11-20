const imageModules = import.meta.glob('../assets/images/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const image = (fileName) => imageModules[`../assets/images/${fileName}`]

export const brand = {
  name: 'DG-Mantenimiento Integral',
  logo: image('logo-DG.jpg'),
  hero: image('ima.avif'),
  whatsappNumber: '542227686688',
  whatsappMessage: 'Hola, me interesa saber mas acerca de sus servicios.',
}

export const navItems = [
  { to: '/', icon: 'fa-house', label: 'Inicio' },
  { to: '/nosotros', icon: 'fa-users', label: 'Nosotros' },
  { to: '/proyectos', icon: 'fa-table-list', label: 'Proyectos' },
  { to: '/contacto', icon: 'fa-envelope', label: 'Contacto' },
]

export const services = [
  {
    id: 'pintura',
    title: 'Pintura',
    subtitle: 'Pintura y acabados',
    description:
      'Realizamos trabajos de pintura interior y exterior, brindando terminaciones prolijas y duraderas.',
    image: image('Pintura04.jpg'),
  },
  {
    id: 'construccion',
    title: 'Construccion',
    subtitle: 'Mantenimiento integral para hogares y empresas.',
    description: 'Ofrecemos servicios de mantenimiento general.',
    image: image('Construccion04.jpg'),
  },
  {
    id: 'singueria',
    title: 'Singueria',
    subtitle: 'Servicios de zingueria y acabados metalicos.',
    description:
      'Ofrecemos servicios de zingueria y acabados metalicos de alta calidad.',
    image: image('logo-DG.jpg'),
  },
  {
    id: 'electricidad',
    title: 'Electricidad',
    subtitle: 'Instalaciones y soluciones electricas.',
    description:
      'Instalaciones y reparaciones electricas seguras y eficientes.',
    image: image('logo-DG.jpg'),
  },
  {
    id: 'plomeria',
    title: 'Plomeria',
    subtitle: 'Servicios de plomeria y reparaciones.',
    description:
      'Instalaciones y reparaciones de tuberias, banos y cocinas.',
    image: image('logo-DG.jpg'),
  },
  {
    id: 'revestimientos',
    title: 'Revestimientos',
    subtitle: 'Instalacion de revestimientos en Durlock.',
    description:
      'Revestimientos de alta calidad, utilizando materiales como Durlock.',
    image: image('Revestimiento04.jpeg'),
  },
]

export const aboutBlocks = [
  {
    title: 'Nuestra historia',
    text: 'Fundada en el ano 2010, la empresa crecio hasta convertirse en una referencia local en mantenimiento integral.',
  },
  {
    title: 'Nuestra mision',
    text: 'Ofrecer un servicio de calidad con herramientas adecuadas, compromiso y un equipo capacitado.',
  },
  {
    title: 'Nuestra vision',
    text: 'Ser reconocidos por la excelencia del servicio, la responsabilidad y la mejora continua.',
  },
  {
    title: 'Ubicacion',
    text: 'Mitre 356, Lobos, Buenos Aires, Argentina.',
  },
  {
    title: 'Nuestros valores',
    text: 'Trabajamos con integridad, compromiso, confianza y respeto por cada cliente.',
  },
  {
    title: 'Experiencia',
    text: 'Mas de 10 anos de trabajo nos permiten ofrecer soluciones efectivas y duraderas.',
  },
]

export const projectImages = [
  { src: image('Proyecto-Img01.png'), alt: 'Proyecto terminado 1' },
  { src: image('Proyecto-Img2.png'), alt: 'Proyecto terminado 2' },
  { src: image('Proyecto-Img3.png'), alt: 'Proyecto terminado 3' },
]

export const serviceGalleries = {
  pintura: [
    'Pintura01 (2).jpg',
    'Pintura02.jpg',
    'Pintura03.jpg',
    'Pintura04.jpg',
    'Pintura05.jpg',
    'Pintura06.jpg',
    'Pintura07.jpg',
  ].map((fileName, index) => ({
    src: image(fileName),
    alt: `Trabajo de pintura ${index + 1}`,
  })),
  construccion: [
    'Construccion01.jpg',
    'Construccion02.jpg',
    'Construccion03.jpg',
    'Construccion04.jpg',
    'Construccion05.jpg',
    'Construccion06.jpg',
    'Construccion07.jpg',
  ].map((fileName, index) => ({
    src: image(fileName),
    alt: `Trabajo de construccion ${index + 1}`,
  })),
  revestimientos: [
    'Revestimiento01.jpeg',
    'Revestimiento02.jpeg',
    'Revestimiento03.jpeg',
    'Revestimiento04.jpeg',
    'Revestimiento05.jpeg',
    'Revestimiento06.jpeg',
    'Revestimiento07.jpeg',
    'Revestimiento08.jpeg',
    'Revestimiento09.jpeg',
    'Revestimiento10.jpeg',
  ].map((fileName, index) => ({
    src: image(fileName),
    alt: `Trabajo de revestimiento ${index + 1}`,
  })),
}
