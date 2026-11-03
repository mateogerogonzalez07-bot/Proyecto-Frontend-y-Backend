import multer from 'multer'         // multer es el que procesa los archivos que vienen en un multipart/form-data

const storage = multer.memoryStorage()  // multer guarda el archivo en memoria, no en disco. Lo vamos a guardar en la base de datos como un buffer

// validacion para solo imagenes
const soloImagenes = (req, file, cb) => {       // cb = callback, es la funcion que le dice a multer si acepta o rechaza el archivo
    if(file.mimetype.startsWith("image/")){     // si el mimetype empieza con image/, es una imagen
        // cb(error, success)
        cb(null, true) //aceptado
    } else {
        cb(new Error("Solo se permiten imágenes"), false) //rechazado
    }
}
// la subida de la imagen
const upload = multer({           // multer es el que procesa los archivos que vienen en un multipart/form-data
    storage,
    fileFilter: soloImagenes,
    limits: {
        fileSize: 4 * 1024 * 1024 // 4MB
    }
})

// Subida de la imagen
// tenés que saber exactamente el name del campo por el cual vas a subir la foto
// imagen es el name del campo por el cual subiremos la foto
export const subirImagen = upload.single("imagen")          // multer va a procesar un solo archivo que venga en el campo "imagen" del multipart/form-data. Lo va a poner en req.file

// manejo de errores:
// limite de peso de la imagen
// campo incorrecto de la imagen
// un error comun de procesamiento
// solo imagenes permitidas
// que no se haya usado multipart

export const manejarErroresDeMulter = (error, req, res, next) => {      // este middleware se encarga de manejar los errores que puedan surgir al subir la imagen con multer
    if(error?.name === "MulterError") {        // si el error es de multer, lo manejamos
        if(error.code === "LIMIT_FILE_SIZE"){   // si el error es de limite de peso, respondemos con 400 y un mensaje
            return res.status(400).json({ error: "La imagen no puede pesar mas de 4 MB" })      // respondemos con 400 y un mensaje
        }
        if(error.code === "LIMIT_UNEXPECTED_FILE"){   // si el error es de campo incorrecto, respondemos con 400 y un mensaje
            return res.status(400).json({ error: `No esperaba un archivo en el campo "${error.field}". El campo tiene que llamarse "imagen"`})
        }
        return res.status(400).json({error: "No se pudo procesar el archivo"})      //

    }

    // error de nuestro filtro de archivos
    if(error?.message === "Solo se permiten imágenes"){     // si el error es de solo imagenes permitidas, respondemos con 400 y un mensaje
        return res.status(400).json({ error: error.message })
    }

    // no escribimos el content-type a mano en postman
    if(error?.message?.includes("Boundary not found")){     // si el error es de que no se puso el content-type a mano en postman, respondemos con 400 y un mensaje
        return res.status(400).json({
            error: "No pongas el header Content-Type a mano: dejá que postman lo arme con la frontera del multipart"
        })
    }
    next(error) // cualquier otro error sigue al middleware general
}




