import React, { useEffect, useRef } from 'react';
import { formatearFecha } from '../utils/formatoUtils';

const ComponenteModalUsuario = ({ estaAbierto, onCerrar, usuario, cargando = false }) => {
    const modalRef = useRef(null);
    const botonCerrarRef = useRef(null);

    useEffect(() => {
        if (estaAbierto) {
            botonCerrarRef.current?.focus();

            const manejarTeclaEsc = (evento) => {
                if (evento.key === 'Escape') {
                    onCerrar();
                }
            };

            const manejarTrapFoco = (evento) => {
                if (!modalRef.current) return;

                const elementosEnfocables = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                const primerElemento = elementosEnfocables[0];
                const ultimoElemento = elementosEnfocables[elementosEnfocables.length - 1];

                if (evento.key === 'Tab') {
                    if (evento.shiftKey) {
                        if (document.activeElement === primerElemento) {
                            evento.preventDefault();
                            ultimoElemento.focus();
                        }
                    } else {
                        if (document.activeElement === ultimoElemento) {
                            evento.preventDefault();
                            primerElemento.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', manejarTeclaEsc);
            document.addEventListener('keydown', manejarTrapFoco);

            document.body.style.overflow = 'hidden';

            return () => {
                document.removeEventListener('keydown', manejarTeclaEsc);
                document.removeEventListener('keydown', manejarTrapFoco);
                document.body.style.overflow = 'unset';
            };
        }
    }, [estaAbierto, onCerrar]);

    if (!estaAbierto) {
        return null;
    }

    const manejarClickFondo = (evento) => {
        if (evento.target === evento.currentTarget) {
            onCerrar();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            onClick={manejarClickFondo}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-titulo"
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-4 sm:mx-0"
            >
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <h2 id="modal-titulo" className="text-lg sm:text-xl font-semibold text-gray-900">
                        Detalles del Usuario
                    </h2>
                    <button
                        ref={botonCerrarRef}
                        onClick={onCerrar}
                        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Cerrar modal"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 sm:p-6">
                    {cargando ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                            <p className="text-gray-600">Cargando detalles...</p>
                        </div>
                    ) : usuario ? (
                        <div className="space-y-4">
                            {usuario.image && (
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={usuario.image}
                                        alt={`Foto de perfil de ${usuario.firstName} ${usuario.lastName}`}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Información Personal</h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">Nombre completo:</span>
                                            <span className="ml-2 text-gray-600">
                                                {usuario.firstName} {usuario.lastName}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Género:</span>
                                            <span className="ml-2 text-gray-600 capitalize">
                                                {usuario.gender || 'No especificado'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Fecha de nacimiento:</span>
                                            <span className="ml-2 text-gray-600">
                                                {formatearFecha(usuario.birthDate)}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Edad:</span>
                                            <span className="ml-2 text-gray-600">
                                                {usuario.age} años
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Información de Contacto</h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">Email:</span>
                                            <span className="ml-2 text-gray-600">
                                                {usuario.email}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Teléfono:</span>
                                            <span className="ml-2 text-gray-600">
                                                {usuario.phone || 'No disponible'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Nombre de usuario:</span>
                                            <span className="ml-2 text-gray-600 font-mono bg-gray-200 px-1 rounded">
                                                {usuario.username}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {usuario.role && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-900 mb-2">Rol</h3>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${usuario.role === 'admin'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {usuario.role}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No se pudieron cargar los detalles del usuario.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end p-4 sm:p-6 border-t border-gray-200">
                    <button
                        onClick={onCerrar}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComponenteModalUsuario;