import {projectService} from "../service/projectService.js"

export const obtenerProyectos = async (req, res, next) => {
    try {
        const proyectos = await projectService.traerTodasLasObras();
        res.status(200).json(proyectos);
    } catch (error) {
        next(error);
    }

}

export const obtenerProyectoPorId = async (req, res, next) => {
    try {
        const { id } = req.params      // obtenemos el id del proyecto de los parámetros de la ruta     
        const proyecto = await projectService.traerObraPorId(id);
        res.status(200).json(proyecto)      // respondemos con el proyecto en formato JSON
    } catch (error) {
        next(error)     // pasamos el error al middleware de manejo de errores
    }
} 
export const crearProyecto = async (req, res, next) => {
    console.log("BODY LLEGANDO",req.body);
    try {
        const { titulo, descripcion } = req.body;// creamos un nuevo proyecto con los datos del body

        if (!titulo || !descripcion) {      // si falta el título o la descripción, lanzamos un error con status 400 y mensaje
            return res.status(400).json({ error: "Faltan datos obligatorios: titulo y descripcion" });
        }

        const nuevoProyecto = await projectService.crearObra(req.body)      // creamos un nuevo proyecto con los datos del body
        res.status(201).json(nuevoProyecto)      // respondemos con el proyecto creado en formato JSON
    } catch (error) {
        next(error)     // pasamos el error al middleware de manejo de errores
    }
}
export const actualizarObra = async (req, res, next) => {
    try {
        const { id } = req.params      // obtenemos el id del proyecto de los parámetros de la ruta
        const { titulo, descripcion, categoria, estado } = req.body      // obtenemos el título y la descripción del body
        if(!titulo || !descripcion) {      // si falta el título o la descripción, lanzamos un error con status 400 y mensaje
            return res.status(401).json({ error: "No se a encontrado el proyecto, porfavor intente de nuevo" });
        }
        const proyectoActualizado = await projectService.editarObraPorId(id, {titulo, descripcion, categoria, estado })      // actualizamos el proyecto con los datos del body
        res.status(200).json(proyectoActualizado)      // respondemos con el proyecto actualizado en formato JSON
    } catch (error) {
        next(error)     // pasamos el error al middleware de manejo de errores
    }
}
export const eliminarProyecto = async (req, res, next) => {
    try {
        const { id } = req.params      // obtenemos el id del proyecto de los parámetros de la ruta
        if(!id) {      // si no hay id, lanzamos un error con status 400 y mensaje
            return res.status(400).json({ error: "No se a encontrado el proyecto, porfavor intente de nuevo" });
        }
        const proyectoEliminado = await projectService.eliminarObraPorId(id)      // eliminamos el proyecto por id
        res.status(200).json(proyectoEliminado)      // respondemos con el proyecto eliminado en formato JSON
       
    } catch (error) {
        next(error)     // pasamos el error al middleware de manejo de errores
    }
}