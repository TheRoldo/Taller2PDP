import { createContext, useState } from 'react';

export const ParqueaderoContext = createContext();

const ParqueaderoProvider = ({ children }) => {
  const [registrosIngresos, setRegistrosIngresos] = useState([]);
  const totalCeldas = 10;
  const [celdasOcupadas, setCeldasOcupadas] = useState(new Array(totalCeldas).fill(false));
  const [celdasDisponiblesCarros, setCeldasDisponiblesCarros] = useState([...Array.from({ length: totalCeldas })].map((_, index) => index + 1));
  const [celdasDisponiblesMotos, setCeldasDisponiblesMotos] = useState([...Array.from({ length: totalCeldas })].map((_, index) => index + 1 + totalCeldas));

  const almacenarIngreso = (ingreso) => {
    setRegistrosIngresos([...registrosIngresos, ingreso]);
  };

  const asignarVehiculoACelda = (numeroCelda, tipoVehiculo) => {
    const nuevasCeldas = [...celdasOcupadas];
    nuevasCeldas[numeroCelda - 1] = true; // Marcar la celda como ocupada
    setCeldasOcupadas(nuevasCeldas);
  
    // Aquí se maneja el registro de las celdas asignadas a cada tipo de vehículo si es necesario
    if (tipoVehiculo === 'carro') {
      setCeldasDisponiblesCarros(celdasDisponiblesCarros.filter((c) => c !== parseInt(numeroCelda)));
    } else if (tipoVehiculo === 'moto') {
      setCeldasDisponiblesMotos(celdasDisponiblesMotos.filter((c) => c !== parseInt(numeroCelda)));
    }
  };

  const liberarCelda = (celda) => {
    const nuevasCeldas = [...celdasOcupadas];
    nuevasCeldas[celda - 1] = false; // Marcar la celda como disponible
    setCeldasOcupadas(nuevasCeldas);
  };

  return (
    <ParqueaderoContext.Provider value={{ registrosIngresos, almacenarIngreso, celdasOcupadas, asignarVehiculoACelda, liberarCelda, celdasDisponiblesCarros, celdasDisponiblesMotos }}>
      {children}
    </ParqueaderoContext.Provider>
  );
};

export default ParqueaderoProvider;