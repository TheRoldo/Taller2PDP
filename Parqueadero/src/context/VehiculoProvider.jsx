import { useState, createContext, useContext } from 'react';

const VehiculoContext = createContext();

export const VehiculoProvider = ({ children }) => {
  const [motosRegistradas, setMotosRegistradas] = useState([]);
  const [carrosRegistrados, setCarrosRegistrados] = useState([]);

  const agregarMoto = (nuevaMoto) => {
    console.log("Empleado agregado:", nuevaMoto);
    setMotosRegistradas([...motosRegistradas, nuevaMoto]);
  };

  const agregarCarro = (nuevoCarro) => {
    console.log("Empleado agregado:", nuevoCarro)
    setCarrosRegistrados([...carrosRegistrados, nuevoCarro]);
  };

  return (
    <VehiculoContext.Provider
      value={{ motosRegistradas, carrosRegistrados, agregarMoto, agregarCarro }}
    >
      {children}
    </VehiculoContext.Provider>
  );
};

const useVehiculo = () => useContext(VehiculoContext);

export { useVehiculo, VehiculoContext };