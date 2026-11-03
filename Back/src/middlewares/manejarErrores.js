
export const manejarErrores = (error, req, res, next) => {
    console.log("🔥 ERROR CAPTURADO:", error.message);

    // 1. Regla de negocio (ErrorApp personalizado)
    if (error.name === "ErrorApp" || error.status) {
        const statusCode = error.status || 400;
        return res.status(statusCode).json({ error: error.message });
    }

    // 2. Body no es un JSON válido
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ error: "El body no es un JSON válido" });
    }

    // 3. ID inválido de MongoDB (CastError)
    if (error.name === "CastError") {
        return res.status(400).json({ error: "Ese id no tiene un formato válido", recibido: error.value });
    }

    // 4. Error de validación de Mongoose
    if (error.name === "ValidationError") {
        return res.status(400).json({
            error: "Los datos no son válidos",
            detalles: Object.values(error.errors).map(e => e.message)
        });
    }

    // 5. Clave duplicada en MongoDB (Unique 11000)
    if (error.code === 11000) {
        return res.status(409).json({ 
            error: "Ya existe un registro con ese dato", 
            campo: Object.keys(error.keyPattern || {})[0] 
        });
    }

    // 6. Error interno no controlado (por defecto)
    console.error("ERROR NO CONTROLADO:", error);
    return res.status(500).json({ 
        error: "Error interno del servidor", 
        detalles: error.message 
    });
};