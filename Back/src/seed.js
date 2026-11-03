import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';
import bcrypt from 'bcryptjs';
import { Category } from './models/category.js';
import { Project } from './models/Project.js';
import { user } from './models/user.js';

const sembrarDatos = async () => {
  try {
    // 1. Conectamos a la base de datos
    await mongoose.connect(MONGO_URI);
    console.log("🔌 Conectado a MongoDB para sembrar datos...");

    // 2. Limpiamos datos anteriores para arrancar de cero
    await Category.deleteMany({});
    await Project.deleteMany({});
    console.log("🧹 Base de datos limpiada.");

    // Adentro de sembrarDatos():
    await user.create({
    nombre: "Mateo",
    email: "mateo@gmail.com",
     password: await bcrypt.hash("mateo123", 10), // Contraseña encriptada
     rol: "admin"
    });
    
    // 3. Creamos las Categorías oficiales de la empresa
    const categoriaPintura = await Category.create({
      nombre: "Pintura",
      descripcion: "Pintura de interiores, exteriores, hidrolavado y sellado de frentes."
    });

    const categoriaMantenimiento = await Category.create({
      nombre: "Mantenimiento Integral",
      descripcion: "Mantenimiento preventivo y correctivo de edificios, techos y consorcios."
    });

    const categoriaReformas = await Category.create({
      nombre: "Albañilería y Reformas",
      descripcion: "Refacciones generales, revoques, colocación de pisos y cerámicas."
    });

    const categoriaZingueria = await Category.create({
      nombre: "Zinguería",
      descripcion: "Fabricación y colocación de canaletas, zinguería a medida y conductos."
    });

    const categoriaElectricidad = await Category.create({
      nombre: "Electricidad",
      descripcion: "Instalaciones eléctricas domiciliarias, tableros y solución de cortocircuitos."
    });

    const categoriaPlomeria = await Category.create({
    nombre: "Plomería",
    descripcion: "Instalación, reparación y mantenimiento de cañerías, grifería y desagües."
    });




    console.log("✅ Categorías creadas.");

    // 4. Creamos Obras de ejemplo usando los IDs de esas categorías
    await Project.create([
      {
        titulo: "Pintura y Restauración de Fachada",
        descripcion: "Hidrolavado a presión, reparación de grietas y aplicación de látex exterior en edificio de 8 pisos.",
        categoria: categoriaPintura._id,
        estado: "Avanzando",
        imagenes: []
      },
      {
        titulo: "Impermeabilización de Terraza",
        descripcion: "Colocación de membrana asfáltica y pintura poliuretánica antihumedad en consorcio.",
        categoria: categoriaMantenimiento._id,
        estado: "Avanzando",
        imagenes: []
      },
      {
        titulo: "Refacción Integral de Oficinas",
        descripcion: "Demolición de tabiques, colocación de porcelanato y pintura general en oficinas comerciales.",
        categoria: categoriaReformas._id,
        estado: "Avanzando",
        imagenes: []
     },
     {
        titulo: "Colocación de Canaletas Pluviales",
        descripcion: "Instalación de sistema de desagüe de techos en chapa galvanizada.",
        categoria: categoriaZingueria._id,
        estado: "finalizada",
        imagenes: []
     },
     {
        titulo: "Instalación de Tablero Seccional",
        descripcion: "Cableado y colocación de térmicas y disyuntor en vivienda.",
        categoria: categoriaElectricidad._id,
        estado: "en proceso",
        imagenes: []
     },
     {
        titulo: "Reparación de Cañería Principal",
        descripcion: "Detección de pérdida y reemplazo de tramo en bajada de tanque.",
        categoria: categoriaPlomeria._id,
        estado: "finalizada",
        imagenes: []
     },

    ]);

    console.log("✅ Obras creadas con éxito.");
    console.log("🌱 ¡Base de datos sembrada con éxito!");

  } catch (error) {
    console.error("❌ Error al sembrar datos:", error.message);
  } finally {
    // 5. Nos desconectamos y salimos
    await mongoose.connection.close();
    process.exit(0);
  }
};

// Ejecutamos la función
sembrarDatos();