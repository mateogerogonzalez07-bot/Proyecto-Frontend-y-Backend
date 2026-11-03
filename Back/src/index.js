import app from "./app.js"
import { conectarDB } from "./db.js"
import { PORT } from "./config.js"

await conectarDB()
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})