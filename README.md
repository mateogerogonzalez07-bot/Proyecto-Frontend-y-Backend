# 🏗️ DG - Mantenimiento Integral

Aplicación web Full-Stack desarrollada para la empresa **DG - Mantenimiento Integral**, orientada a la gestión y exhibición de obras, reformas (pintura, electricidad, plomería, etc.), administración de proyectos mediante panel privado y recepción de consultas de clientes.

---

## 📋 Tabla de Contenidos
1. [Tecnologías Utilizadas](#-tecnolog%C3%ADas-utilizadas)
2. [Estructura de la Base de Datos](#-estructura-de-la-base-de-datos-mongodb)
3. [Instalación y Puesta en Marcha](#-instalaci%C3%B3n-y-puesta-en-marcha)
4. [Listado de Endpoints de la API](#-listado-de-endpoints-de-la-api)
5. [Ejemplos de Datos Mock (JSON)](#-ejemplos-de-datos-mock-formato-json)
6. [Funcionalidades Implementadas y Futuras](#-funcionalidades)
7. [Variables de Entorno](#-variables-de-entorno)

---

## 💻 Tecnologías Utilizadas

### Frontend:
* **React.js** (construido con **Vite**)
* **React Router DOM v6** (para navegación SPA y rutas protegidas)
* **CSS3 moderno** (diseño adaptable y personalizado)

### Backend:
* **Node.js** con **Express.js**
* **MongoDB** con **Mongoose ODM**
* **Autenticación:** JWT (JSON Web Tokens) y cifrado seguro con **Bcryptjs**
* **Seguridad & Utilidades:** CORS, manejo centralizado de errores

---

## 🗄️ Estructura de la Base de Datos (MongoDB)

### 1. Colección `users`
* `nombre`: String (requerido)
* `email`: String (requerido, único)
* `password`: String (hasheado con bcrypt)
* `rol`: String (enum: `admin`, `usuario`, default: `usuario`)
* `timestamps`: Fechas de creación y actualización

### 2. Colección `projects`
* `titulo`: String (requerido)
* `descripcion`: String (requerido)
* `categoria`: ObjectId (referencia a la colección `Category`)
* `estado`: String (enum: `activo`, `pausado`, `finalizado`, default: `activo`)
* `imagenes`: Array de Strings (URLs de imágenes)
* `timestamps`: Fechas de creación y actualización

### 3. Colección `categories`
* `nombre`: String (requerido, ej: "Plomería", "Electricidad", "Pintura")
* `descripcion`: String (opcional)

### 4. Colección `messages`
* `nombre`: String (requerido)
* `apellido`: String (requerido)
* `telefono`: String (requerido)
* `email`: String (requerido)
* `edad`: Number/String (opcional)
* `servicio`: String (requerido)
* `mensaje`: String (requerido)
* `timestamps`: Fecha de envío

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos:
* Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
* Tener corriendo [MongoDB](https://www.mongodb.com/) en local (`mongodb://localhost:27017`) o MongoDB Atlas.

### Paso 1: Configurar y Correr el Backend
1. Abrir una terminal y ubicarse en la carpeta `Back`:
   ```bash
   cd Back
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar el archivo `.env` en la raíz de `Back` (ver sección [Variables de Entorno](#-variables-de-entorno)).
4. Iniciar el servidor:
   ```bash
   npm run dev
   ```
   *El servidor quedará corriendo en `http://localhost:3000`*.

---

### Paso 2: Configurar y Correr el Frontend
1. Abrir otra terminal y ubicarse en la carpeta del Frontend:
   ```bash
   cd Front/Proyecto-react
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
   *El frontend quedará corriendo en `http://localhost:5173`*.

---

## 📡 Listado de Endpoints de la API

### Autenticación y Usuarios (`/api/auth` / `/api/users`)
| Método | Endpoint | Descripción | Requiere Admin |
|---|---|---|---|
| `POST` | `/api/auth/login` | Inicia sesión y devuelve Token JWT + datos de usuario | No |
| `GET` | `/api/users` | Lista todos los usuarios registrados | Sí (`Bearer Token`) |
| `GET` | `/api/users/:id` | Obtiene un usuario específico por ID | Sí (`Bearer Token`) |
| `POST` | `/api/users` | Registra un nuevo usuario | No |
| `DELETE` | `/api/users/:id` | Elimina un usuario por ID | Sí (`Bearer Token`) |

### Proyectos / Obras (`/api/projects`)
| Método | Endpoint | Descripción | Requiere Admin |
|---|---|---|---|
| `GET` | `/api/projects` | Lista todos los proyectos cargados | No |
| `GET` | `/api/projects/:id` | Obtiene el detalle de un proyecto | Sí (`Bearer Token`) |
| `POST` | `/api/projects` | Crea una nueva obra o proyecto | Sí (`Bearer Token`) |
| `PUT` | `/api/projects/:id` | Modifica un proyecto existente | Sí (`Bearer Token`) |
| `DELETE` | `/api/projects/:id` | Elimina un proyecto del sistema | Sí (`Bearer Token`) |

### Categorías (`/api/category`)
| Método | Endpoint | Descripción | Requiere Admin |
|---|---|---|---|
| `GET` | `/api/category` | Lista las categorías disponibles | No |

### Mensajes de Contacto (`/api/messages`)
| Método | Endpoint | Descripción | Requiere Admin |
|---|---|---|---|
| `POST` | `/api/messages` | Recibe las consultas del formulario web y las guarda | No |

---

## 📦 Ejemplos de Datos Mock (Formato JSON)

### 1. Mock para Login (`POST /api/auth/login`)
```json
{
  "email": "mateo@gmail.com",
  "password": "password123"
}
```

### 2. Mock para Crear/Actualizar Proyecto (`POST / PUT /api/projects`)
```json
{
  "titulo": "Renovación Integral de Baño y Cañerías",
  "descripcion": "Cambio completo de cañerías en termofusión y colocación de sanitarios en edificio Royal.",
  "categoria": "65d4b8f1234567890abcdef1",
  "estado": "activo",
  "imagenes": [
    "https://ejemplo.com/fotos/bano1.jpg",
    "https://ejemplo.com/fotos/bano2.jpg"
  ]
}
```

### 3. Mock para Envío de Mensaje de Contacto (`POST /api/messages`)
```json
{
  "nombre": "Benito",
  "apellido": "Juárez",
  "telefono": "2227485128",
  "email": "benitojuarez@gmail.com",
  "edad": "35",
  "servicio": "Electricidad",
  "mensaje": "Hola, necesito más información y presupuesto para cambio de térmica y cableado."
}
```

### 4. Mock para Crear Usuario (`POST /api/users`)
```json
{
  "nombre": "Administrador DG",
  "email": "admin@dg.com",
  "password": "AdminPasswordSegura123",
  "rol": "admin"
}
```

---

## ✨ Funcionalidades

### Implementadas:
* [x] **Autenticación con JWT:** Login seguro con persistencia en cliente y verificación de credenciales con Bcrypt.
* [x] **Control de Acceso basado en Roles (RBAC):** Restricción de rutas administrativas exclusivamente para usuarios con rol `admin`.
* [x] **Panel de Administración (CRUD Proyectos):** Creación, lectura, edición y eliminación de proyectos en tiempo real.
* [x] **Selector Dinámico de Categorías:** Enlace automático con las categorías cargadas en base de datos para evitar errores de ObjectId.
* [x] **Formulario de Contacto Funcional:** Conexión del frontend al backend para almacenar consultas de potenciales clientes.

### A Futuro:
* [ ] Carga directa de archivos de imagen usando Multer y almacenamiento en la nube (Cloudinary / Supabase Storage).
* [ ] Bandeja de entrada en el Panel de Administrador para responder mensajes de clientes por correo o WhatsApp.
* [ ] Cotizador de presupuestos online estimado según metros cuadrados y tipo de refacción.

---

## 🔐 Variables de Entorno

Crear un archivo `.env` en la raíz de la carpeta `Back` tomando como base este ejemplo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/empresa_db
JWT_SECRET=mi_clave_secreta_super_segura
JWT_EXPIRES_IN=4h
STORAGE=local
CARPETA_IMAGENES=uploads
BCRYPT_SALT_ROUNDS=10
```
