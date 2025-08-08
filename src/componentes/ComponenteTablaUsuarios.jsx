import { formatearNombreCompleto } from '../utils/formatoUtils';

const ComponenteTablaUsuarios = ({ usuarios = [], onClickUsuario, cargando = false }) => {
    if (cargando) {
        return (
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600">Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    if (!usuarios || usuarios.length === 0) {
        return (
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center py-12">
                    <svg
                        className="w-12 h-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay usuarios</h3>
                    <p className="text-gray-600">No se encontraron usuarios para mostrar.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rol
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {usuario.image && (
                                            <img
                                                className="h-10 w-10 rounded-full object-cover mr-4"
                                                src={usuario.image}
                                                alt={`Foto de ${usuario.firstName}`}
                                            />
                                        )}
                                        <div>
                                            <button
                                                onClick={() => onClickUsuario(usuario)}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline"
                                            >
                                                {formatearNombreCompleto(usuario.firstName, usuario.lastName)}
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {usuario.age}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {usuario.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${usuario.role === 'admin'
                                        ? 'bg-red-100 text-red-800 font-bold'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {usuario.role || 'usuario'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">
                        Usuarios ({usuarios.length})
                    </h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {usuarios.map((usuario) => (
                        <div key={usuario.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex items-start space-x-3">
                                {usuario.image && (
                                    <img
                                        className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                                        src={usuario.image}
                                        alt={`Foto de ${usuario.firstName}`}
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <button
                                        onClick={() => onClickUsuario(usuario)}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline block"
                                    >
                                        {formatearNombreCompleto(usuario.firstName, usuario.lastName)}
                                    </button>
                                    <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                                        <span>{usuario.age} años</span>
                                        <span className={`inline-flex px-2 py-1 rounded-full font-medium ${usuario.role === 'admin'
                                            ? 'bg-red-100 text-red-800 font-bold'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {usuario.role || 'usuario'}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600 truncate">
                                        {usuario.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComponenteTablaUsuarios;