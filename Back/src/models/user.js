import { Schema, model } from "mongoose"      // esto es lo que usamos para definir el modelo y el esquema de la colección
import { ROLES } from "../utils/constants.js"      // esto es lo que usamos para definir los roles de usuario

const userSchema = new Schema(
    {
        nombre: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        rol: { type: String, enum: Object.values(ROLES), default: ROLES.EMPLEADO }
    },
    {
        timestamps: true
    }
);
export const user = model("user", userSchema)
