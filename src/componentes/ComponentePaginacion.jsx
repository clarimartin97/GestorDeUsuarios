
const ComponentePaginacion = ({
    paginaActual,
    totalPaginas,
    onCambioPagina,
    cargando = false
}) => {
    const puedeIrAnterior = paginaActual > 1;
    const puedeIrSiguiente = paginaActual < totalPaginas;

    const manejarAnterior = () => {
        if (puedeIrAnterior && !cargando) {
            onCambioPagina(paginaActual - 1);
        }
    };

    const manejarSiguiente = () => {
        if (puedeIrSiguiente && !cargando) {
            onCambioPagina(paginaActual + 1);
        }
    };

    const manejarPaginaEspecifica = (numeroPagina) => {
        if (!cargando && numeroPagina !== paginaActual) {
            onCambioPagina(numeroPagina);
        }
    };

    const generarNumerosPagina = () => {
        const numeros = [];
        const rango = 2;

        let inicio = Math.max(1, paginaActual - rango);
        let fin = Math.min(totalPaginas, paginaActual + rango);

        if (paginaActual <= rango) {
            fin = Math.min(totalPaginas, 2 * rango + 1);
        }
        if (paginaActual > totalPaginas - rango) {
            inicio = Math.max(1, totalPaginas - 2 * rango);
        }

        for (let i = inicio; i <= fin; i++) {
            numeros.push(i);
        }

        return numeros;
    };

    if (totalPaginas <= 1) {
        return null;
    }

    const numerosPagina = generarNumerosPagina();

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            <button
                onClick={manejarAnterior}
                disabled={!puedeIrAnterior || cargando}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
          ${puedeIrAnterior && !cargando
                        ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                aria-label="Página anterior"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="flex space-x-1">
                {numerosPagina[0] > 1 && (
                    <>
                        <button
                            onClick={() => manejarPaginaEspecifica(1)}
                            disabled={cargando}
                            className="px-3 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            1
                        </button>
                        {numerosPagina[0] > 2 && (
                            <span className="px-2 py-2 text-gray-500">...</span>
                        )}
                    </>
                )}

                {numerosPagina.map((numero) => (
                    <button
                        key={numero}
                        onClick={() => manejarPaginaEspecifica(numero)}
                        disabled={cargando}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
              ${numero === paginaActual
                                ? 'bg-blue-600 text-white border border-blue-600'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        aria-label={`Página ${numero}`}
                        aria-current={numero === paginaActual ? 'page' : undefined}
                    >
                        {numero}
                    </button>
                ))}

                {numerosPagina[numerosPagina.length - 1] < totalPaginas && (
                    <>
                        {numerosPagina[numerosPagina.length - 1] < totalPaginas - 1 && (
                            <span className="px-2 py-2 text-gray-500">...</span>
                        )}
                        <button
                            onClick={() => manejarPaginaEspecifica(totalPaginas)}
                            disabled={cargando}
                            className="px-3 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {totalPaginas}
                        </button>
                    </>
                )}
            </div>

            <button
                onClick={manejarSiguiente}
                disabled={!puedeIrSiguiente || cargando}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
          ${puedeIrSiguiente && !cargando
                        ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                aria-label="Página siguiente"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default ComponentePaginacion;