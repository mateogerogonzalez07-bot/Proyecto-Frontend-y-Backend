import { Category } from "../models/category.js"
import { ErrorApp } from "../utils/ErrorApp.js"
import { Project } from "../models/Project.js";

export const traerTodasLasCategorias = async () => {
  return await Category.find().populate({
    path: 'productos',
    model: 'Project'
  });
};

export const traerCategoriaPorId = async (id) => {
  const categoria = await Category.findById(id).populate({
    path: 'productos',
    model: 'Project'
  });
  if (!categoria) {
    throw new ErrorApp("Categoría no encontrada", 404);
  }
  return categoria;
};

export const crearCategoria = async (datos) => {
    const nuevaCategoria = new Category(datos);
    if(!datos)
    {
        throw new ErrorApp("Datos incompletos", 400);
    }
    return await nuevaCategoria.save();
};

export const actualizarCategoriaPorId = async (id, datos) => {
    const categoria = await Category.findByIdAndUpdate(id, datos, { new: true });   
    if (!categoria) {
        throw new ErrorApp("Categoría no encontrada", 404);
    }
    return categoria;
};

export const eliminarCategoriaPorId = async (id) => {
    const categoria = await Category.findByIdAndDelete(id);
    if (!categoria) {
        throw new ErrorApp("❌ Categoría no encontrada, ingrese el id correcto para que la categoría se eliminada", 404);
    }
    return { message: "✅ Categoría eliminada con exito" };
};

export const categoryService = {
    traerTodasLasCategorias,
    traerCategoriaPorId,
    crearCategoria,
    actualizarCategoriaPorId,
    eliminarCategoriaPorId
};