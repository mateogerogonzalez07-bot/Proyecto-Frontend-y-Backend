import {message} from "../models/message.js";
import { ErrorApp } from "../utils/ErrorApp.js";

export const traerTodosLosMensajes = async () => {
    return await message.find();
};

export const traerMensajePorId = async (id) => {
    const mensaje = await message.findById(id);
    if (!mensaje) {
        throw new ErrorApp("Mensaje no encontrado", 404);
    }
    return mensaje;
};

export const crearMensaje = async (datos) => {
    const nuevoMensaje = new message(datos);
    if(!datos)
    {
        throw new ErrorApp("Datos incompletos", 400);
    }
    return await nuevoMensaje.save();
};

export const eliminarMensajePorId = async (id) => {
    const mensaje = await message.findByIdAndDelete(id);    
    if (!mensaje) {
        throw new ErrorApp("❌ Mensaje no encontrado, ingrese el id correcto para que el mensaje se eliminada", 404);
    }
    return { message: "✅ Mensaje eliminado con exito" };
};

export const messageService = {
    traerTodosLosMensajes,
    traerMensajePorId,
    crearMensaje,
    eliminarMensajePorId
};
