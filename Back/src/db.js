import mongoose from 'mongoose';
import {MONGO_URI} from './config.js';

export const conectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Conexión exitosa a la base de datos");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error);
        process.exit(1);
    }
};
