import { Schema, model } from "mongoose"      // esto es lo que usamos para definir el modelo y el esquema de la colección

const categorySchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre de la categoría es obligatorio"],
            unique: true,
            trim: true,
            minlength: [3, "El nombre de la categoría debe tener al menos 3 caracteres"],
            maxlength: [50, "El nombre de la categoría no puede tener más de 50 caracteres"]
        },
        descripcion: {
            type: String,
            required: [true, "La descripción de la categoría es obligatoria"],
            trim: true,
            minlength: [10, "La descripción de la categoría debe tener al menos 10 caracteres"],
            maxlength: [200, "La descripción de la categoría no puede tener más de 200 caracteres"]
        },
        productos: [{
        type: Schema.Types.ObjectId,
        ref: "Project" 
        }]},
        {
            timestamps: true      // Fecha de creación y actualización
        }
    
);
export const Category = model("Category", categorySchema)