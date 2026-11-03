// src/models/Project.js
import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
  titulo:      { type: String, required: true },  // Texto obligatorio
  descripcion: { type: String, required: true },  // Texto obligatorio
  categoria:   { 
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: false
   },  
  estado: {type: String, required:false, default: "activo"},
  imagenes:    [{ type: String, require:false }]
},
  {
    timestamps: true      // Fecha de creación y actualización
  }             
  );


export const Project = model('Project', projectSchema);