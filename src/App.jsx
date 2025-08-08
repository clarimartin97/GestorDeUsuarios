import React, { useState, useEffect, useCallback } from 'react';
import { obtenerUsuarios, buscarUsuarios, obtenerUsuarioPorId } from './servicios/apiUsuarios';
import ComponenteTablaUsuarios from './componentes/ComponenteTablaUsuarios';
import ComponenteBuscador from './componentes/ComponenteBuscador';
import ComponentePaginacion from './componentes/ComponentePaginacion';
import ComponenteModalUsuario from './componentes/ComponenteModalUsuario';
import ComponenteCargando from './componentes/ComponenteCargando';
import ComponenteError from './componentes/ComponenteError';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [usuariosPorPagina] = useState(10);

  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [estaEnBusquedaMode, setEstaEnBusquedaMode] = useState(false);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [cargandoModal, setCargandoModal] = useState(false);

  const [parametrosURL, setParametrosURL] = useState(new URLSearchParams(window.location.search));
  const [inicializado, setInicializado] = useState(false);

  useEffect(() => {
    if (!inicializado) {
      const params = new URLSearchParams(window.location.search);
      const paginaURL = parseInt(params.get('page')) || 1;
      const busquedaURL = params.get('q') || '';

      setPaginaActual(paginaURL);
      setTerminoBusqueda(busquedaURL);
      setEstaEnBusquedaMode(!!busquedaURL);
      setInicializado(true);

      if (busquedaURL) {
        buscarUsuarios(busquedaURL).then(respuesta => {
          setUsuarios(respuesta.users);
          setTotalUsuarios(respuesta.total);
        }).catch(err => {
          setError(err.message);
          setUsuarios([]);
        }).finally(() => {
          setCargando(false);
        });
      } else {
        const saltar = (paginaURL - 1) * usuariosPorPagina;
        obtenerUsuarios(usuariosPorPagina, saltar).then(respuesta => {
          setUsuarios(respuesta.users);
          setTotalUsuarios(respuesta.total);
        }).catch(err => {
          setError(err.message);
          setUsuarios([]);
        }).finally(() => {
          setCargando(false);
        });
      }
    }
  }, [inicializado, usuariosPorPagina]);

  const actualizarURL = (nuevaPagina, nuevaBusqueda = '') => {
    const params = new URLSearchParams();

    if (nuevaPagina > 1) {
      params.set('page', nuevaPagina.toString());
    }

    if (nuevaBusqueda) {
      params.set('q', nuevaBusqueda);
    }

    const nuevaURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.pushState({}, '', nuevaURL);
  };

  const cargarUsuarios = useCallback(async (pagina) => {
    try {
      setCargando(true);
      setError(null);

      const saltar = (pagina - 1) * usuariosPorPagina;
      const respuesta = await obtenerUsuarios(usuariosPorPagina, saltar);

      setUsuarios(respuesta.users);
      setTotalUsuarios(respuesta.total);
      setPaginaActual(pagina);
      setEstaEnBusquedaMode(false);

      actualizarURL(pagina);
    } catch (err) {
      setError(err.message);
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  }, [usuariosPorPagina]);

  const manejarBusqueda = useCallback(async (consulta, pagina = 1) => {
    if (!consulta || consulta.trim() === '') {
      return;
    }

    try {
      setCargandoBusqueda(true);
      setError(null);

      const respuesta = await buscarUsuarios(consulta);

      setUsuarios(respuesta.users);
      setTotalUsuarios(respuesta.total);
      setPaginaActual(pagina);
      setTerminoBusqueda(consulta);
      setEstaEnBusquedaMode(true);

      actualizarURL(pagina, consulta);
    } catch (err) {
      setError(err.message);
      setUsuarios([]);
    } finally {
      setCargandoBusqueda(false);
    }
  }, []);

  const limpiarBusqueda = useCallback(() => {
    setTerminoBusqueda('');
    setEstaEnBusquedaMode(false);
    cargarUsuarios(1);
  }, [cargarUsuarios]);

  const manejarCambioPagina = (nuevaPagina) => {
    if (estaEnBusquedaMode) {
      manejarBusqueda(terminoBusqueda, nuevaPagina);
    } else {
      cargarUsuarios(nuevaPagina);
    }
  };

  const manejarClickUsuario = async (usuario) => {
    try {
      setModalAbierto(true);
      setCargandoModal(true);
      setUsuarioSeleccionado(null);

      const usuarioCompleto = await obtenerUsuarioPorId(usuario.id);
      setUsuarioSeleccionado(usuarioCompleto);
    } catch (err) {
      console.error('Error al cargar detalles del usuario:', err);
      setUsuarioSeleccionado(usuario);
    } finally {
      setCargandoModal(false);
    }
  };


  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
    setCargandoModal(false);
  };


  const manejarReintentar = () => {
    if (estaEnBusquedaMode) {
      manejarBusqueda(terminoBusqueda, paginaActual);
    } else {
      cargarUsuarios(paginaActual);
    }
  };

  const totalPaginas = Math.ceil(totalUsuarios / usuariosPorPagina);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Explorador de Usuarios
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Explora y busca usuarios de la plataforma
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComponenteBuscador
          onBuscar={manejarBusqueda}
          onLimpiar={limpiarBusqueda}
          cargando={cargandoBusqueda}
        />

        {estaEnBusquedaMode && terminoBusqueda && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm text-blue-800">
                  Resultados de búsqueda para: <strong>"{terminoBusqueda}"</strong>
                </span>
                <span className="ml-2 text-xs text-blue-600">
                  ({totalUsuarios} resultado{totalUsuarios !== 1 ? 's' : ''})
                </span>
              </div>
              <button
                onClick={limpiarBusqueda}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Limpiar búsqueda
              </button>
            </div>
          </div>
        )}

        {error ? (
          <ComponenteError
            mensaje={error}
            onReintentar={manejarReintentar}
          />
        ) : (
          <>
            <ComponenteTablaUsuarios
              usuarios={usuarios}
              onClickUsuario={manejarClickUsuario}
              cargando={cargando}
            />

            {!cargando && usuarios.length > 0 && (
              <ComponentePaginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambioPagina={manejarCambioPagina}
                cargando={cargandoBusqueda}
              />
            )}
          </>
        )}

        <ComponenteModalUsuario
          estaAbierto={modalAbierto}
          onCerrar={cerrarModal}
          usuario={usuarioSeleccionado}
          cargando={cargandoModal}
        />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Clara Martin - Full Stack Developer
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;