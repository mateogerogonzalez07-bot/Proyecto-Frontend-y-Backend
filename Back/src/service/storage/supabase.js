import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Creamos la conexión con Supabase usando tus variables del .env
export const supabase = createClient(supabaseUrl, supabaseKey);

// Función para subir una foto al bucket 'uploads'
export const subirFotoASupabase = async (file) => {
  if (!file) return null;

  // Creamos un nombre único para que no se pisen las fotos
  const nombreArchivo = `${Date.now()}-${file.originalname}`;

  // Subimos el archivo a Supabase
  const { data, error } = await supabase.storage
    .from(process.env.CARPETA_IMAGENES || 'uploads')
    .upload(nombreArchivo, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    throw new Error(`Error al subir a Supabase: ${error.message}`);
  }

  // Obtenemos la URL pública para verla en la web
  const { data: publicUrlData } = supabase.storage
    .from(process.env.CARPETA_IMAGENES || 'uploads')
    .getPublicUrl(nombreArchivo);

  return publicUrlData.publicUrl;
};