const URL_BASE = 'https://dummyjson.com';

/**
 * @param {number} limite - Número de usuarios por página
 * @param {number} saltar - Número de usuarios a saltar (para paginación)
 * @returns {Promise<Object>} - Respuesta con usuarios y metadatos de paginación
 */
export const obtenerUsuarios = async (limite = 10, saltar = 0) => {
  try {
    const respuesta = await fetch(`${URL_BASE}/users?limit=${limite}&skip=${saltar}`);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron cargar los usuarios. Por favor, intenta de nuevo.');
  }
};

/**
 * Busca usuarios por nombre
 * @param {string} consulta - Término de búsqueda
 * @returns {Promise<Object>} - Respuesta con usuarios encontrados
 */
export const buscarUsuarios = async (consulta) => {
  try {
    if (!consulta || consulta.trim() === '') {
      throw new Error('La consulta de búsqueda no puede estar vacía');
    }
    
    const respuesta = await fetch(`${URL_BASE}/users/search?q=${encodeURIComponent(consulta.trim())}`);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    throw new Error('No se pudo realizar la búsqueda. Por favor, intenta de nuevo.');
  }
};

/**
 * Obtiene los detalles completos de un usuario específico
 * @param {number} id - ID del usuario
 * @returns {Promise<Object>} - Datos completos del usuario
 */
export const obtenerUsuarioPorId = async (id) => {
  try {
    const respuesta = await fetch(`${URL_BASE}/users/${id}`);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    throw new Error('No se pudieron cargar los detalles del usuario. Por favor, intenta de nuevo.');
  }
};