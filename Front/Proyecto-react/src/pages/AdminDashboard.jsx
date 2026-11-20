import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_PROJECTS = `${import.meta.env.VITE_API_URL}/projects`;
const API_CATEGORIES = `${import.meta.env.VITE_API_URL}/category`;

function AdminDashboard() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    estado: 'activo',
    imagenes: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarProyectos();
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const res = await fetch(API_CATEGORIES);
      const data = await res.json();
      if (res.ok) {
        setCategorias(data);
        if (data.length > 0 && !formData.categoria) {
          setFormData(prev => ({ ...prev, categoria: data[0]._id }));
        }
      }
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const cargarProyectos = async () => {
    setCargando(true);
    try {
      const res = await fetch(API_PROJECTS);
      const data = await res.json();
      if (res.ok) {
        setProyectos(data);
      } else {
        setError('Error al cargar proyectos');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función que se ejecuta cuando enviás el formulario.
// async permite usar await para esperar las respuestas del servidor.
const handleSubmit = async (e) => {
  // Evita que el envío del formulario recargue la página.
  e.preventDefault();

  // Limpia cualquier mensaje de error anterior.
  setError('');

  // Guarda una referencia al elemento HTML del formulario.
  const formulario = e.currentTarget;

  // Busca el input cuyo name es "imagen" y obtiene el primer archivo.
  // ?. evita un error si no encuentra el campo o su lista de archivos.
  // Si no se seleccionó una foto, archivo queda como undefined.
  const archivo = formulario.elements.namedItem('imagen')?.files?.[0];

  // Si hay una foto, comprueba que no supere los 4 MB.
  // El tamaño del archivo se mide en bytes.
  if (archivo && archivo.size > 4 * 1024 * 1024) {
    // Muestra el mensaje de error en el panel.
    setError('La imagen no puede pesar más de 4 MB.');

    // Detiene la función para no enviar un archivo demasiado grande.
    return;
  }

  // Crea un contenedor que permite enviar textos y archivos juntos.
  // FormData se envía como multipart/form-data.
  const payload = new FormData();

  // Agrega el título con el nombre que espera el backend.
  payload.append('titulo', formData.titulo);

  // Agrega la descripción del proyecto.
  payload.append('descripcion', formData.descripcion);

  // Agrega el estado: activo, pausado o finalizado.
  payload.append('estado', formData.estado);

  // Comprueba que haya una categoría seleccionada.
  if (formData.categoria) {
    // Agrega el ID de la categoría.
    // Evita enviar una cadena vacía a un campo ObjectId de MongoDB.
    payload.append('categoria', formData.categoria);
  }

  // Comprueba si seleccionaste una foto.
  if (archivo) {
    // Agrega el archivo con el nombre "imagen".
    // Debe coincidir con upload.single('imagen') en Multer.
    payload.append('imagen', archivo);
  }

  // Intenta realizar el envío y procesar la respuesta.
  try {
    // Si estamos editando, agrega el ID del proyecto a la URL.
    // Si estamos creando, usa la dirección general de proyectos.
    const url = editandoId
      ? `${API_PROJECTS}/${editandoId}`
      : API_PROJECTS;

    // Envía la solicitud al backend y espera su respuesta.
    const res = await fetch(url, {
      // Usa PUT para actualizar un proyecto y POST para crear uno.
      method: editandoId ? 'PUT' : 'POST',

      // Define los encabezados de la solicitud.
      headers: {
        // Envía el token para que el backend valide el acceso.
        Authorization: `Bearer ${token}`
      },

      // Envía los campos y la foto dentro de FormData.
      // No uses JSON.stringify ni agregues Content-Type manualmente:
      // el navegador configura el encabezado multipart y su boundary.
      body: payload
    });

    // Lee el cuerpo de la respuesta como texto.
    // Esto permite detectar si el servidor devuelve algo distinto de JSON.
    const texto = await res.text();

    // Declara la variable donde guardaremos la respuesta interpretada.
    let data;

    // Intenta convertir el texto recibido en datos de JavaScript.
    try {
      // Si hay contenido, lo interpreta como JSON.
      // Si la respuesta está vacía, usa un objeto vacío.
      data = texto ? JSON.parse(texto) : {};
    } catch {
      // Si el contenido no es JSON válido, genera un error.
      // Incluye el estado HTTP para ayudar a identificar el problema.
      throw new Error(
        `El servidor devolvió una respuesta no válida (HTTP ${res.status}).`
      );
    }

    // res.ok es true cuando el estado HTTP está entre 200 y 299.
    // Si está fuera de ese rango, tratamos la respuesta como un error.
    if (!res.ok) {
      // Usa el mensaje enviado por el backend.
      // Si no hay mensaje, muestra el código HTTP.
      throw new Error(
        data.error || data.message || `Error HTTP ${res.status}`
      );
    }

    // Restablece los campos del estado de React y sale del modo edición.
    limpiarFormulario();

    // Restablece los controles HTML, incluido el selector de archivo.
    formulario.reset();

    // Vuelve a consultar los proyectos para actualizar el listado.
    await cargarProyectos();
  } catch (err) {
    // Captura errores de conexión y los errores generados con throw.
    // Muestra su mensaje o un texto alternativo si no hay uno disponible.
    setError(err.message || 'No se pudo enviar el proyecto.');
  }
};

  const handleEditar = (proyecto) => {
    setEditandoId(proyecto._id);
    setFormData({
      titulo: proyecto.titulo || '',
      descripcion: proyecto.descripcion || '',
      categoria: proyecto.categoria?._id || proyecto.categoria || '',
      estado: proyecto.estado || 'activo',
      imagenes: proyecto.imagenes ? proyecto.imagenes.join(', ') : ''
    });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar este proyecto?')) return;

    try {
      const res = await fetch(`${API_PROJECTS}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        cargarProyectos();
      } else {
        const data = await res.json();
        setError(data.error || 'No se pudo eliminar el proyecto');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }
  };

  const limpiarFormulario = () => {
    setEditandoId(null);
    setFormData({
      titulo: '',
      descripcion: '',
      categoria: categorias[0]?._id || '',
      estado: 'activo',
      imagenes: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Panel de Administración - Proyectos</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>

      {error && <div style={{ padding: '10px', background: '#ffebee', color: '#c62828', marginBottom: '15px', borderRadius: '4px' }}>{error}</div>}

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3>{editandoId ? '✏️ Modificar Proyecto' : '➕ Agregar Nuevo Proyecto'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Título:</label>
            <input 
              type="text" 
              name="titulo" 
              value={formData.titulo} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Descripción:</label>
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleChange} 
              required 
              rows="3"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Categoría:</label>
              {/* SELECT DESPLEGABLE EN LUGAR DE TEXTO */}
              <select 
                name="categoria" 
                value={formData.categoria} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              >
                {categorias.length === 0 ? (
                  <option value="">Cargando categorías...</option>
                ) : (
                  categorias.map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.nombre || cat.titulo || cat.name || cat._id}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Estado:</label>
              <select 
                name="estado" 
                value={formData.estado} 
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              >
                <option value="activo">Activo</option>
                <option value="pausado">Pausado</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
          </div>

         <div>
  {/* Texto que explica para qué sirve el selector. */}
  <label>Seleccionar imagen desde la PC:</label>

  {/*
   La key identifica este campo con el proyecto que estoy editando. Si paso a otro proyecto o de editar a crear,
    cambia la key y el campo vuelve a quedar sin ningún archivo seleccionado. No borra fotos de ningún lado.Cambiar el 
    título o la descripción no vacía el campo.'nuevo' es la identificación que usamos cuando estoy creando. 
    type="file": permite seleccionar un archivo de tu computadora.
    name="imagen": debe coincidir con el nombre que espera Multer.
    accept="image/*": indica al selector que muestre imágenes;
    el backend también debe validar el archivo recibido.
    required={!editandoId}: exige una foto al crear un proyecto,
    pero permite editar uno existente sin seleccionar otra.
  */}
  <input
    key={editandoId || 'nuevo'}
    type="file"
    name="imagen"
    accept="image/*"
    required={!editandoId}
  />

  {/* Muestra una aclaración debajo del selector. */}
  {/* display: 'block' hace que ocupe su propia línea. */}
  <small style={{ display: 'block' }}>
    Máximo 4 MB.

    {/* Este mensaje aparece únicamente cuando estás editando. */}
    {/* El controlador determina si reemplaza o conserva las imágenes. */}
    {editandoId &&
      ' Si seleccionás una foto, reemplazará las imágenes actuales. Si no seleccionás ninguna, se conservarán.'}
  </small>
</div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={{ padding: '10px 20px', background: editandoId ? '#ffc107' : '#0056b3', color: editandoId ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {editandoId ? 'Guardar Cambios' : 'Crear Proyecto'}
            </button>
            {editandoId && (
              <button type="button" onClick={limpiarFormulario} style={{ padding: '10px 15px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      <h3>Listado de Proyectos</h3>
      {cargando ? (
        <p>Cargando proyectos...</p>
      ) : proyectos.length === 0 ? (
        <p>No hay proyectos registrados todavía.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '10px' }}>Título</th>
              <th style={{ padding: '10px' }}>Descripción</th>
              <th style={{ padding: '10px' }}>Estado</th>
              <th style={{ padding: '10px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{p.titulo}</td>
                <td style={{ padding: '10px' }}>{p.descripcion}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '12px', background: p.estado === 'activo' ? '#d4edda' : '#f8d7da', color: p.estado === 'activo' ? '#155724' : '#721c24' }}>
                    {p.estado}
                  </span>
                </td>
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                  <button onClick={() => handleEditar(p)} style={{ marginRight: '8px', padding: '5px 10px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Editar
                  </button>
                  <button onClick={() => handleEliminar(p._id)} style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;