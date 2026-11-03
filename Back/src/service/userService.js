
//import { login } from "../controllers/userController.js";
import { user } from "../models/user.js";
import { ErrorApp } from "../utils/ErrorApp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (email, password) => {
  const usuarioEncontrado = await user.findOne({ email });
  if (!usuarioEncontrado) {
    throw new ErrorApp("Esa dirección no existe", 404);
  }

  const esPasswordValida = await bcrypt.compare(password, usuarioEncontrado.password);
  if (!esPasswordValida) {
    throw new ErrorApp("Contraseña incorrecta", 401);
  }

  const token = jwt.sign(
    { id: usuarioEncontrado._id, rol: usuarioEncontrado.rol }, 
    process.env.JWT_SECRET || "tu_clave_secreta", 
    { expiresIn: "2h" }
  );

  return {
    token,
    usuario: {
      id: usuarioEncontrado._id,
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
      rol: usuarioEncontrado.rol
    }
  };
};

export const traerTodosLosUsuarios = async () => {
  return await user.find();
};

export const traerUsuarioPorId = async (id) => {
  const usuario = await user.findById(id);
  if (!usuario) {
      throw new ErrorApp("Usuario no encontrado", 404);
  }   
  return usuario;
};

export const crearUsuarioService = async (datos) => {
  if (!datos || Object.keys(datos).length === 0) {
    throw new ErrorApp("Datos incompletos", 400);
  }
  const nuevoUsuario = new user(datos);
  return await nuevoUsuario.save();
};

export const eliminarUsuarioPorId = async (id) => {
  const usuario = await user.findByIdAndDelete(id);
  if (!usuario) {
      throw new ErrorApp("Usuario no encontrado", 404);
  }
  return { message: "Usuario eliminado con éxito" };
};

export const userService = {
  loginUser,
  traerTodosLosUsuarios,
  traerUsuarioPorId,
  crearUsuarioService,
  eliminarUsuarioPorId
};
