import { ErrorApp } from "../utils/ErrorApp.js"     // importamos la clase ErrorApp para poder lanzar errores personalizados

// Gracias a esto podemos controlar el acceso a rutas por rol
export const permitirRoles = (...roles) => {        // esta función recibe un array de roles permitidos y devuelve un middleware que verifica si el rol del usuario está en ese array
    return (req, res, next) => {        // este middleware se encarga de verificar si el rol del usuario está en el array de roles permitidos
        if(!roles.includes(req.usuario.rol)) {     // si el rol del usuario no está en el array de roles permitidos, lanzamos un error con status 403 y mensaje
            throw new ErrorApp(`Esta acción requiere uno de estos roles: ${roles.join(", ")}`, 403);
        }
        next()      // si el rol del usuario está en el array de roles permitidos, pasamos al siguiente middleware
    }
}

// 401 ->Unauthorized -> no sé quien sos (falta el token, o no es valido)
// 403 -> forbidden -> se quien sos y NO podes hacer esto