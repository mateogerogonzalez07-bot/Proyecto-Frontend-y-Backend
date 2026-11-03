import { permitirRoles } from "../middlewares/permitirRoles.js"      // importamos el middleware permitirRoles para poder usarlo en las rutas
import { verificarToken } from "../middlewares/verificarToken.js"    // importamos el middleware verificarToken para poder usarlo en las rutas
                                    
export const ROLES = Object.freeze({        // usamos Object.freeze para que el objeto no pueda ser modificado
  ADMIN: 'admin',       // Tu papá o vos (los dueños)
  EMPLEADO: 'empleado'  // Por si el día de mañana un encargado de obra sube fotos
});

// Solo el administrador puede borrar o modificar obras:
export const soloAdmin = [ verificarToken, permitirRoles(ROLES.ADMIN) ];