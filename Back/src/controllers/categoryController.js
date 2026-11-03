import {categoryService} from "../service/categoryService.js"


export const getCategories = async (req, res, next) => {
    try {
        // Llamamos al servicio en lugar de usar Category.find() suelto
        const categories = await categoryService.traerTodasLasCategorias(); 
        return res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

export const obtenerCategoriaPorId = async (req, res, next) => {
    try{
        const {id} = req.params
        const categoria = await categoryService.traerCategoriaPorId(id);
        res.status(200).json(categoria)
    }catch (error){
        next(error)
    }
}

export const crearCategoria = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const {descripcion} = req.body;
        const nuevaCategoria = await categoryService.crearCategoria({ nombre, descripcion });
        res.status(201).json({ mensaje: "✅ Categoría creada con éxito", data: nuevaCategoria });
    } catch (error) {
        next(error);
    }
};

export const actualizarCategoriaPorId = async (req, res, next) => {
    try{
        const {id} = req.params;
        const { nombre } = req.body;
        const categoriaActualizada = await categoryService.actualizarCategoriaPorId(id, { nombre });
        res.status(200).json({ mensaje: "✅ Categoría actualizada con éxito", data: categoriaActualizada });
    }catch (error){
        next(error)
    }
};

export const eliminarCategoriaPorId = async (req, res, next) => {
    try{
        const {id} = req.params;  
        const categoriaEliminada = await categoryService.eliminarCategoriaPorId(id);
        res.status(200).json({ mensaje: "✅ Categoría eliminada con éxito", data: categoriaEliminada });
    }catch (error){
        next(error)
    }
};

