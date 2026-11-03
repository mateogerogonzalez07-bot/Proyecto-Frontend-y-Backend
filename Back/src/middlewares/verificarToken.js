import jwt from "jsonwebtoken"      // este es el que firma y verifica los tokens
import { ErrorApp } from "../utils/ErrorApp.js"     // este es el que usamos para lanzar errores con status y mensaje   
import { JWT_SECRET } from "../config.js"     // este es el que usamos para firmar y verificar los tokens

// 🧢🧢🧢

export const verificarToken = (req, res, next) => {     // este middleware se encarga de verificar que el token sea válido y no esté vencido
    const header = req.headers.authorization || ""      // este es el header que manda el Front: "Authorization: Bearer <token>"
    if(!header.startsWith("Bearer ")){                  // si no empieza con Bearer, es un token inválido
        throw new ErrorApp("Falta el token. Mandá el header Authorization: Bearer <token>", 401)        // este es el que usamos para lanzar errores con status y mensaje
    }

    // quita la palabra Bearer y se queda solo con el token
    const token = header.slice(7) 
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4gUGVyZXoiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMDB9.4S8_00u2X_fake_signature_for_testing_only_12345"

    try {  
        // revisamos si el token está firmado por nosotros y si no está vencido
        const payload = jwt.verify(token, JWT_SECRET)

        // guarda el request los datos del usuario (este es el que obtenemos en el controller de carrito)
        req.usuario = { id: payload.id, rol: payload.rol }

        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {       // si el token está vencido, lanzamos un error con status 401 y mensaje
            throw new ErrorApp("El token venció, volvé a iniciar sesión", 401)
        }
        throw new ErrorApp("Token inválido", 401)       // si el token no es válido, lanzamos un error con status 401 y mensaje
    }
}