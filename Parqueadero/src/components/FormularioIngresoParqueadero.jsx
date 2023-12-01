import { useContext, useState, useEffect } from 'react';
import { VehiculoContext } from '../context/VehiculoProvider';
import { ParqueaderoContext } from '../context/ParqueaderoProvider';

const FormularioIngresoParqueadero = () => {
    const { motosRegistradas, carrosRegistrados } = useContext(VehiculoContext);
    const { almacenarIngreso, asignarVehiculoACelda } = useContext(ParqueaderoContext);
  
    const [cedulaIngresada, setCedulaIngresada] = useState('');
    const [placaIngresada, setPlacaIngresada] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedCelda, setSelectedCelda] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [horaIngreso, setHoraIngreso] = useState('');

    const [celdasDisponiblesCarros, setCeldasDisponiblesCarros] = useState([]);
    const [celdasDisponiblesMotos, setCeldasDisponiblesMotos] = useState([]);
    const [celdasOcupadas, setCeldasOcupadas] = useState([]);


    const marcarCeldaComoOcupada = (celda, tipoVehiculo) => {
        if (tipoVehiculo === 'carro') {
            setCeldasDisponiblesCarros(celdasDisponiblesCarros.filter((c) => c !== parseInt(celda)));
        } else if (tipoVehiculo === 'moto') {
            setCeldasDisponiblesMotos(celdasDisponiblesMotos.filter((c) => c !== parseInt(celda)));
        }
        setCeldasOcupadas([...celdasOcupadas, parseInt(celda)]);
    };

    const celdaEstaDisponible = (celda, tipoVehiculo) => {
        if (tipoVehiculo === 'carro') {
            return celdasDisponiblesCarros.includes(parseInt(celda));
        } else if (tipoVehiculo === 'moto') {
            return celdasDisponiblesMotos.includes(parseInt(celda));
        }
        return false;
    };

    const buscarPorCedula = () => {
        if (cedulaIngresada.trim() === '') {
            setErrorMessage('Ingresa una cédula válida.');
            return;
        }

        const motosByCedula = motosRegistradas.filter(moto => moto.cedulaEmpleado === cedulaIngresada);
        const carrosByCedula = carrosRegistrados.filter(carro => carro.cedulaEmpleado === cedulaIngresada);

        if (motosByCedula.length === 0 && carrosByCedula.length === 0) {
            setErrorMessage('No se encontraron vehículos asociados a esta cédula.');
            return;
        }

        const vehiculosAsociados = [...motosByCedula, ...carrosByCedula];
        setSelectedVehicle(vehiculosAsociados);
    };

    const handleVehicleSelection = (vehicle) => {
        setSelectedVehicle(vehicle);
        setPlacaIngresada(vehicle.placa);
    };

    const buscarPorPlaca = () => {
        const vehiculoPlaca = motosRegistradas.find((moto) => moto.placa === placaIngresada) || 
                              carrosRegistrados.find((carro) => carro.placa === placaIngresada);
        // Si se encuentra un vehículo con la placa ingresada, mostrar su información
        if (vehiculoPlaca) {
            setSelectedVehicle(vehiculoPlaca);
        } else {
            // Si no se encuentra, mostrar un mensaje de error
            setErrorMessage('No se encontró ningún vehículo con esa placa.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    const handleIngreso = () => {

        if (!selectedVehicle) {
            setErrorMessage('Por favor, seleccione un vehículo.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return;
        }
    
        if (!selectedCelda) {
            setErrorMessage('Por favor, seleccione un número de celda.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return;
        }
    
        if (celdaEstaDisponible(selectedCelda, selectedVehicle.tipoVehiculo)) {
            marcarCeldaComoOcupada(selectedCelda, selectedVehicle.tipoVehiculo);

            // Actualiza la interfaz después de marcar la celda como ocupada
            asignarVehiculoACelda(selectedCelda, selectedVehicle.tipoVehiculo);

            // Aquí se registra el ingreso con la información necesaria
            const ingreso = {
                cedula: cedulaIngresada,
                placa: selectedVehicle.placa,
                fechaIngreso: new Date().toLocaleDateString(),
                horaIngreso: new Date().toLocaleTimeString(),
                numeroCeldaIngresado: selectedCelda
            };
    
            // Lógica para almacenar los datos del ingreso 
            almacenarIngreso(ingreso)
    
            // Limpiar los campos después del ingreso
            setCedulaIngresada('');
            setPlacaIngresada('');
            setFechaIngreso('');
            setHoraIngreso('');
            setSelectedVehicle(null);
            setSelectedCelda('');
        } else {
            setErrorMessage(`La celda ${selectedCelda} ya está ocupada.`);
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    useEffect(() => {
        // Inicialización de celdas disponibles al montar el componente
        const totalCeldasCarros = 5;
        const totalCeldasMotos = 5;

        const carrosDisponibles = Array.from({ length: totalCeldasCarros }, (_, index) => index + 1);
        const motosDisponibles = Array.from({ length: totalCeldasMotos }, (_, index) => index + 1 + totalCeldasCarros);

        setCeldasDisponiblesCarros(carrosDisponibles);
        setCeldasDisponiblesMotos(motosDisponibles);
    }, []);

    return (
        <div>
            <h2>Formulario de Ingreso al Parqueadero</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form>
                <div>
                    <label>
                        Cédula:
                        <input
                            type="number"
                            value={cedulaIngresada}
                            onChange={(e) => setCedulaIngresada(e.target.value)}
                        />
                    </label>
                    <button type="button" onClick={buscarPorCedula}>
                        Buscar por Cédula
                    </button>
                    {selectedVehicle && selectedVehicle.length > 0 && (
                        <div>
                            <h3>Vehículos asociados a la cédula:</h3>
                            <ul>
                                {selectedVehicle.map(vehicle => (
                                    <li key={vehicle.placa}>
                                        {vehicle.placa} - {vehicle.marca}{' '}
                                        <button type="button" onClick={() => handleVehicleSelection(vehicle)}>
                                            Seleccionar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                )}
                </div>
                <div>
                    <label>
                        Placa del vehículo:
                        <input
                            type="text"
                            value={placaIngresada}
                            onChange={(e) => setPlacaIngresada(e.target.value)}
                        />
                    </label>
                    <button type="button" onClick={buscarPorPlaca}>
                        Buscar por Placa
                    </button>

                    {selectedVehicle && (
                        <div>
                            <h3>Información del vehículo:</h3>
                            <p>Placa: {selectedVehicle.placa}</p>
                            <p>Tipo Vehiculo: {selectedVehicle.tipoVehiculo}</p>
                            <p>Marca: {selectedVehicle.marca}</p>
                            <p>Modelo: {selectedVehicle.modelo}</p>
                            <p>Cilindraje: {selectedVehicle.cilindraje}</p>
                        </div>
                    )}
                </div>
                <label>
                    Número de celda:
                    <select
                        value={selectedCelda}
                        onChange={(e) => setSelectedCelda(e.target.value)}
                    >
                        <option value="">Selecciona una celda</option>
                        {selectedVehicle && selectedVehicle.tipoVehiculo === 'carro' &&
                            celdasDisponiblesCarros.map((celda) => (
                                <option key={`carro-${celda}`} value={celda}>
                                    Celda {celda} (Carro)
                                </option>
                            ))}
                        {selectedVehicle && selectedVehicle.tipoVehiculo === 'moto' &&
                            celdasDisponiblesMotos.map((celda) => (
                                <option key={`moto-${celda}`} value={celda}>
                                    Celda {celda} (Moto)
                                </option>
                            ))}
                    </select>
                </label>
                <label>
                    Fecha de ingreso:
                    <input
                        type="date"
                        value={fechaIngreso}
                        onChange={(e) => setFechaIngreso(e.target.value)}
                    />
                </label>
                <label>
                    Hora de ingreso:
                    <input
                        type="time"
                        value={horaIngreso}
                        onChange={(e) => setHoraIngreso(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleIngreso}>Registrar Ingreso</button>
            </form>
        </div>
   );
};

export default FormularioIngresoParqueadero;