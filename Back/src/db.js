import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';

// Cachear la conexión para que funcione en Vercel (serverless)
let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export const conectarDB = async () => {
  // Si ya hay conexión activa, la reutilizamos
  if (cached.conn) {
    return cached.conn;
  }

  // Si ya hay una promesa de conexión en curso, la esperamos
  if (!cached.promise) {
    console.log("Intentando conectar a MongoDB...");
    console.log("URI presente:", !!MONGO_URI);
    cached.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    }).then((m) => {
      console.log("✅ Conexión exitosa a la base de datos");
      return m;
    }).catch((error) => {
      console.error("❌ Error al conectar:", error.message);
      cached.promise = null; // Resetear para reintentar
      throw error; // NO process.exit(1)
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};