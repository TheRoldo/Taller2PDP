import { useContext } from 'react';
import { ParqueaderoContext } from '../context/ParqueaderoProvider';

const Parqueadero = () => {
  const { celdasOcupadas, liberarCelda } = useContext(ParqueaderoContext);

  return (
    <div>
      <h2>Estado del Parqueadero</h2>
      <div className="parqueadero-grid">
        {celdasOcupadas.map((ocupada, index) => (
          <div key={index} className={`celda ${ocupada ? 'ocupada' : 'disponible'}`}>
            <span>Celda {index + 1}</span>
            {ocupada && ( // Mostrar el botón solo si la celda está ocupada
              <button onClick={() => liberarCelda(index + 1)}>Liberar</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parqueadero;