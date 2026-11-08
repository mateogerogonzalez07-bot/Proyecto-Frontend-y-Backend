// Carga las variables del .env antes de crear la conexión.
import 'dotenv/config';

// Importa la función para conectarse a Supabase.
import { createClient } from '@supabase/supabase-js';

// Obtiene la URL del proyecto desde las variables de entorno.
const supabaseUrl = process.env.SUPABASE_URL;

// Obtiene la clave desde las variables de entorno.
const supabaseKey = process.env.SUPABASE_KEY;

// Comprueba que ambas variables tengan un valor.
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Falta configurar SUPABASE_URL o SUPABASE_KEY en el .env del backend'
  );
}

// Crea y exporta la conexión.
export const supabase = createClient(supabaseUrl, supabaseKey);

// Función para subir una foto al bucket 'uploads'
export const subirFotoASupabase = async (file) => {
  // Si no llegó un archivo, no intentamos subirlo.
  if (!file) return null;

  // Leemos el nombre del bucket desde el .env.
  const bucket = process.env.CARPETA_IMAGENES?.trim();

  // Si no está configurado, mostramos un error claro.
  if (!bucket) {
    throw new Error('Falta CARPETA_IMAGENES en el .env del backend');
  }

  // Mostramos el destino real sin mostrar claves privadas.
  console.log('URL de Supabase:', supabaseUrl);
  console.log('Bucket usado:', JSON.stringify(bucket));

  // Generamos el nombre del archivo.
  const nombreArchivo = `${Date.now()}-${file.originalname}`;

  // Subimos la foto al bucket configurado.
  const { error } = await supabase.storage
    .from(bucket)
    .upload(nombreArchivo, file.buffer, {
      contentType: file.mimetype,
    });

  // Si Supabase rechaza la subida, mostramos el motivo.
  if (error) {
    throw new Error(`Error al subir a Supabase: ${error.message}`);
  }

  // Usamos exactamente el mismo bucket para obtener la URL.
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(nombreArchivo);

  // Devolvemos la URL para guardarla en MongoDB.
  return data.publicUrl;
};
console.log('>>> SE CARGÓ MI ARCHIVO DE SUPABASE <<<');