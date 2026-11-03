import { Router } from "express";
import { loginUser,traerTodosLosUsuarios,traerUsuarioPorId ,crearUsuario ,eliminarUsuarioPorId, loginUsuario } from "../controllers/userController.js"
import {soloAdmin} from "../utils/constants.js"

const router = Router();

router.get('/', soloAdmin, traerTodosLosUsuarios);
router.get('/:id', soloAdmin, traerUsuarioPorId);
router.post('/', crearUsuario);
router.post('/login', loginUser);
router.delete('/:id', soloAdmin, eliminarUsuarioPorId);

export default router;