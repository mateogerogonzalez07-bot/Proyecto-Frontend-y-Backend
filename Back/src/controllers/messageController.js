import {messageService} from "../service/messageService.js";

export const enviarMensaje = async (req, res) => {
    const nuevoMensaje = await messageService.crearMensaje(req.body);
    res.status(201).json({
        message:"✅ Mensaje enviado con exito, ¡Gracias por contactarnos! Nos pondremos en contacto contigo lo antes posible!",
        data: nuevoMensaje
    });
}

export const listarMensajes = async (req, res) => {
    const mensajes = await messageService.traerTodosLosMensajes();
    res.status(200).json(mensajes);
}