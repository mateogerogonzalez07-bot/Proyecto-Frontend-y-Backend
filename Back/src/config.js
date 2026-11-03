import dotenv from 'dotenv';

const config = dotenv.config({ quiet: true }) // esto lo que hace es: leer el archivo .env y cargar las variables de entorno en process.env. El parámetro quiet: true hace que no se muestre ningún mensaje en la consola si no se encuentra el archivo .env.

 const PORT = process.env.PORT || 3000;
 const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dg_mantenimiento';
 const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_123';
 const CARPETA_IMAGENES = process.env.CARPETA_IMAGENES || 'uploads';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '4h';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
const API_URL = process.env.API_URL || 'http://localhost:3000';

const STORAGE = process.env.STORAGE || 'local'; // 'local' o 'supabase'

export  {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    STORAGE,
    SUPABASE_URL,
    SUPABASE_KEY,
    API_URL,
    CARPETA_IMAGENES,
    BCRYPT_SALT_ROUNDS
};