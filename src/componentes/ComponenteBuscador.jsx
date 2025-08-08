import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { validarConsultaBusqueda } from '../utils/formatoUtils';

/**
 * Componente de búsqueda con debounce
 * @param {Object} props - Props del componente
 * @param {Function} props.onBuscar - Función a ejecutar cuando se realiza una búsqueda
 * @param {boolean} props.cargando - Indica si se está realizando una búsqueda
 * @param {Function} props.onLimpiar - Función para limpiar la búsqueda
 * @returns {JSX.Element} - Elemento JSX del buscador
 */
const ComponenteBuscador = ({ onBuscar, cargando = false, onLimpiar }) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const terminoConDebounce = useDebounce(terminoBusqueda, 350);

    useEffect(() => {
        if (validarConsultaBusqueda(terminoConDebounce)) {
            onBuscar(terminoConDebounce);
        } else if (terminoConDebounce === '' && terminoBusqueda === '') {
            onLimpiar?.();
        }
    }, [terminoConDebounce, onBuscar, onLimpiar]);

    const manejarCambio = (evento) => {
        setTerminoBusqueda(evento.target.value);
    };

    const manejarLimpiar = () => {
        setTerminoBusqueda('');
        onLimpiar?.();
    };

    return (
        <div className="relative max-w-md mx-auto mb-6">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    value={terminoBusqueda}
                    onChange={manejarCambio}
                    placeholder="Buscar usuarios por nombre..."
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    disabled={cargando}
                />
                {terminoBusqueda && (
                    <button
                        onClick={manejarLimpiar}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        disabled={cargando}
                    >
                        <svg
                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
            {cargando && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
            )}
        </div>
    );
};

export default ComponenteBuscador;