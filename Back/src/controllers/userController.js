import { userService } from "../service/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await userService.loginUser(email, password);

    return res.status(200).json({
      message: "Login exitoso",
      token: resultado.token,
      usuario: resultado.usuario
    });
  } catch (error) {
    // Esto previene que se propague cualquier estructura circular al cliente
    return res.status(400).json({
      error: error.message || "Credenciales inválidas"
    });
  }
};
export const traerTodosLosUsuarios = async (req, res, next) => {
  try{
    const usuarios = await userService.find();
    res.status(201).json(usuarios);
  } catch (error) {
    next(error);
  }
}

export const traerUsuarioPorId = async (req, res, next) => {
    try{
        const { id } = req.params;
        const usuario = await userService.findById(id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}

export const crearUsuario = async (req, res, next) => {
    try{
        const nuevoUsuario = new user(req.body);
        res.status(201).json(await nuevoUsuario.save());
    } catch (error) {
        next(error);
    }
}

export const eliminarUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await userService.findByIdAndDelete(id);
        res.status(200).json({ message: "Usuario eliminado con exito" });
    } catch (error) {
        next(error);
    }
}

// 👉 FUNCIÓN DE LOGIN NUEVA AL FINAL
export const loginUsuario = async (req, res, next) => {
    console.log("BODY QUE LLEGA:", req.body);
  try {
    const { email, password } = req.body;

    const usuarioEncontrado = await userService.findOne({ email });
    if (!usuarioEncontrado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const esPasswordValida = await bcrypt.compare(password, usuarioEncontrado.password);
    if (!esPasswordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuarioEncontrado._id, rol: usuarioEncontrado.rol },
      process.env.JWT_SECRET || "secreto_super_seguro",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      mensaje: "Login exitoso",
      token
    });
  } catch (error) {
    next(error);
  }
};