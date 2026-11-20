# DG-Mantenimiento Integral

Proyecto migrado desde HTML y CSS a una aplicacion React creada con Vite.

## Requisitos

- Node.js instalado
- npm instalado

## Como ejecutar

```bash
npm install
npm run dev
```

Luego abrir la URL que muestre Vite, normalmente:

```bash
http://localhost:5173/
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Estructura principal

```text
src/
|-- assets/       Imagenes y recursos
|-- components/   Navbar, Layout, Cards, Gallery, Contact, Footer
|-- data/         Datos usados por los componentes
|-- hooks/        Custom hooks
|-- pages/        Paginas conectadas con React Router
`-- styles/       CSS separado por componente o seccion
```

## Funcionalidades React

- Componentes reutilizables.
- Navegacion con React Router.
- Formulario de contacto controlado con `useState`.
- Eventos de inputs, reset y submit visibles en la consola del navegador.
- Galerias y cards generadas desde datos.
