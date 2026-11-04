import 'dotenv/config'; // Carga tu archivo .env
import { subirFotoASupabase } from './supabase.js';

async function probar() {
  console.log("⏳ Conectando con Supabase y subiendo imagen de prueba...");

  // Creamos un archivo falso en memoria de prueba
  const archivoDePrueba = {
    originalname: 'prueba-conexion.txt',
    mimetype: 'text/plain',
    buffer: Buffer.from('¡Hola Supabase! La conexión desde mi Backend funciona perfecto.')
  };

  try {
    const urlPublica = await subirFotoASupabase(archivoDePrueba);
    console.log("✅ ¡ÉXITO TOTAL! Archivo subido a Supabase.");
    console.log("🔗 URL pública generada:", urlPublica);
  } catch (error) {
    console.error("❌ Error al probar Supabase:", error.message);
  }
}

probar();