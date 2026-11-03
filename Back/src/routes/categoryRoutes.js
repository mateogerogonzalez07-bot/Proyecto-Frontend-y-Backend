import { Router } from "express"
import { getCategories, obtenerCategoriaPorId, crearCategoria, actualizarCategoriaPorId, eliminarCategoriaPorId } from "../controllers/categoryController.js"
import { soloAdmin } from "../utils/constants.js"

const router = Router();

router.get('/', getCategories);
router.get('/:id', soloAdmin, obtenerCategoriaPorId);
router.post('/', soloAdmin, crearCategoria);
router.put('/:id', soloAdmin, actualizarCategoriaPorId);
router.delete('/:id', soloAdmin, eliminarCategoriaPorId);

export default router;