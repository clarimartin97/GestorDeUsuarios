/**
 * Formatea el nombre completo concatenando nombre y apellido
 * @param {string} nombre - Nombre del usuario
 * @param {string} apellido - Apellido del usuario
 * @returns {string} - Nombre completo formateado
 */
export const formatearNombreCompleto = (nombre, apellido) => {
  return `${nombre} ${apellido}`.trim();
};

/**
 * Formatea una fecha en formato legible
 * @param {string} fecha - Fecha en formato ISO
 * @returns {string} - Fecha formateada
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return 'No disponible';
  
  try {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Fecha inválida';
  }
};

/**
 * Valida si una cadena de búsqueda es válida
 * @param {string} consulta - Cadena a validar
 * @returns {boolean} - True si es válida, false en caso contrario
 */
export const validarConsultaBusqueda = (consulta) => {
  return consulta && consulta.trim().length > 0;
};