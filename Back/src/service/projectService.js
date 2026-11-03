import {Project} from "../models/Project.js"
import { ErrorApp } from "../utils/ErrorApp.js"

// esta funcion es para traer todas las obras de la base de datos y las devuelve en un array.
export const traerTodasLasObras = async () => {
    return await Project.find();    // esta funcion lo que haces es traer todas las obras de la base de datos y las devuelve en un array.
};
// esta funcion es para traer una obra por su id y la devuelve en un objeto.
export const traerObraPorId = async (id) => {
    const obra = await Project.findById(id).populate('categoria');
    if (!obra) {            // si no se encontro la obra, lanza un error con status 404 y mensaje
        throw new ErrorApp("Obra no encontrada", 404);      // sino se encontro la obra, lanza un error con status 404 y mensaje
    }
    return obra;
};
// esta funcion es para crear una obra y la devuelve en un objeto.
export const crearObra = async (datos) => {
    const nuevaObra = new Project(datos);
    if(!datos)
    {
        throw new ErrorApp("Datos incompletos", 400);
    }
    return await nuevaObra.save();
};
// esta funcion es para editar una obra por su id y la devuelve en un objeto.
export const editarObraPorId = async (id, datos) => {
    const obra = await Project.findByIdAndUpdate(id, datos, { new: true });
    if (!obra){            // si no se encontro la obra, lanza un error con status 404 y mensaje
        throw new ErrorApp("Obra no encontrada", 404);
    }
    return obra;
};
// esta funcion es para eliminar una obra por su id y la devuelve en un objeto.
export const eliminarObraPorId = async (id) => {
    const obra = await Project.findByIdAndDelete(id);
    if (!obra){            // si no se encontro la obra, lanza un error con status 404 y mensaje
        throw new ErrorApp("❌ Obra no encontrada, ingrese el id correcto para que la obra se eliminada", 404);
    }
    return obra;
};

export const projectService = {
    traerTodasLasObras,
    traerObraPorId,
    crearObra,
    editarObraPorId,
    eliminarObraPorId
};