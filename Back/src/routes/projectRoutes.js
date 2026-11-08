import { Router } from 'express';     //import { Project } from '../models/Project.js';
import { obtenerProyectos,  obtenerProyectoPorId, crearProyecto, actualizarObra, eliminarProyecto } from '../controllers/projectController.js';
import { soloAdmin } from '../utils/constants.js';
import { loginUsuario } from '../controllers/userController.js';
import { subirImagen, manejarErroresDeMulter } from '../middlewares/subirImagen.js';

const router = Router();

router.get('/', obtenerProyectos);      // Ruta para obtener todos los proyectos
router.get('/:id',soloAdmin , obtenerProyectoPorId);
router.post(
  '/',
  soloAdmin,
  subirImagen,
  manejarErroresDeMulter,
  crearProyecto
);

router.put(
  '/:id',
  soloAdmin,
  subirImagen,
  manejarErroresDeMulter,
  actualizarObra
);
router.delete('/:id',soloAdmin , eliminarProyecto);

//la ruta para el login
router.post('/login', loginUsuario);

export default router;