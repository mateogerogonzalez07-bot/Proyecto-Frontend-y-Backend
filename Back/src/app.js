import express from 'express'
import cors from "cors"
const app = express();

// CORS: permite que tu Front en React se conecte sin bloqueos
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import projectRoutes from "./routes/projectRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import { manejarErrores } from './middlewares/manejarErrores.js'
import { CARPETA_IMAGENES } from './config.js';
//import swaggerUi from "swagger-ui-express"
//import { especificacion } from './docs/swagger.js'



// Servir las fotos de las obras guardadas en el disco
app.use(`/${CARPETA_IMAGENES}`, express.static(CARPETA_IMAGENES))

// Documentación de Swagger
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(especificacion, {
//    customSiteTitle: "DG Mantenimiento Integral - API Documentación",
//    swaggerOptions: { persistAuthorization: true }
//}))

//app.get("/api-docs.json", (req, res) => {
//    res.json(especificacion)
//})

// ==========================================
//  RUTAS DE LA CONSTRUCTORA
// ==========================================
app.use("/api/auth", userRoutes)         // Login para vos/tu papá
app.use("/api/projects", projectRoutes) // Galería de obras y reformas
app.use('/api/messages', messageRoutes) // Contacto para tus clientes
app.use("/api/category", categoryRoutes) // Categorías de obras y reformas
app.use("/api/users", userRoutes) // Usuarios y roles de la constructora
// Caso 404 cuando la dirección no existe
app.use((req, res) => {
    res.status(404).json({ error: "Esa dirección no existe" })
})

// Middleware global de errores
app.use(manejarErrores)

export default app