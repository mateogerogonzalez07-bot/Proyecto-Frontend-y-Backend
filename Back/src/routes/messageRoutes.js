import { Router } from "express";
import { enviarMensaje, listarMensajes } from "../controllers/messageController.js";
import { soloAdmin } from "../utils/constants.js";

const router = Router();

router.post('/', enviarMensaje);
router.get('/listar', soloAdmin, listarMensajes);
    

export default router;
