import {projectService} from "../service/projectService.js"
import { subirFotoASupabase } from "../service/storage/supabase.js";

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
    const { titulo, descripcion, categoria, estado } = req.body;

    if (!titulo?.trim() || !descripcion?.trim()) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios: titulo y descripcion'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'Seleccioná una imagen para el proyecto'
      });
    }

    const urlImagen = await subirFotoASupabase(req.file);

    const datosProyecto = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado: estado || 'activo',
      imagenes: [urlImagen]
    };

    if (categoria) {
      datosProyecto.categoria = categoria;
    }

    const nuevoProyecto =
      await projectService.crearObra(datosProyecto);

    return res.status(201).json(nuevoProyecto);
  } catch (error) {
    next(error);
  }
 }

export const actualizarObra = async (req, res, next) => {
  try {
    const { id } = req.params;                                 // aca tenemos el id del proyecto que queremos actualizar. y el req.params es un objeto que contiene todos los parámetros de la ruta. en este caso, el id del proyecto que queremos actualizar.
    const { titulo, descripcion, categoria, estado } = req.body; // aca tenemos los datos que queremos actualizar. y el req.body es un objeto que contiene todos los datos que vienen en el body de la petición. en este caso, el titulo, descripcion, categoria y estado del proyecto que queremos actualizar.

    if (!titulo?.trim() || !descripcion?.trim()) {  // si no hay titulo o descripcion, respondemos con un error 400 y un mensaje
      return res.status(400).json({
        error: 'Faltan datos obligatorios: titulo y descripcion'
      });
    }

    // Verificamos que el proyecto exista.
    await projectService.traerObraPorId(id);

    const datosProyecto = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim()
    };

    if (categoria) {
      datosProyecto.categoria = categoria;
    }

    if (estado) {
      datosProyecto.estado = estado;
    }

    // Solo cambiamos las imágenes si se seleccionó otra foto.
    if (req.file) {
      const urlImagen = await subirFotoASupabase(req.file);
      datosProyecto.imagenes = [urlImagen];
    }

    const proyectoActualizado =
      await projectService.editarObraPorId(id, datosProyecto);

    return res.status(200).json(proyectoActualizado);
  } catch (error) {
    next(error);
  }
};
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