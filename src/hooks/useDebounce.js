import { useState, useEffect } from 'react';

export const useDebounce = (valor, retraso) => {
  const [valorConDebounce, setValorConDebounce] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorConDebounce(valor);
    }, retraso);

    return () => {
      clearTimeout(temporizador);
    };
  }, [valor, retraso]);

  return valorConDebounce;
};