import {Schema, model} from "mongoose";

const messageSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {    
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    mensaje: {
        type: String,
        required: [true, "El mensaje es obligatorio"],
        trim: true
    },
   
    leido: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

export const message = model("message", messageSchema);