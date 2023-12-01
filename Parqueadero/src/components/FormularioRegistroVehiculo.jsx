import { useState } from 'react';
import { useVehiculo } from '../context/VehiculoProvider';

const FormularioRegistroVehiculo = () => {
    
    const { motosRegistradas, carrosRegistrados, agregarMoto, agregarCarro } = useVehiculo();

    const [cedulaEmpleado, setCedulaEmpleado] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('moto');
    const [placa, setPlaca] = useState('');
    const [cilindraje, setCilindraje] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Verificación de campos obligatorios
        if (!placa || (!cilindraje && tipoVehiculo === 'moto') || (!modelo && tipoVehiculo === 'carro') || !marca) {
            setErrorMessage('Por favor, completa todos los campos obligatorios.');
            return;
        }

        const cedulaExiste = verificarCedulaExistente(cedulaEmpleado);
        if(cedulaExiste) {
            setErrorMessage('Esta cedula ya tiene una placa asociada');

            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    
        // Verificación de placa existente
        const placaExistente = verificarPlacaExistente(placa);
        if (placaExistente) {
            setErrorMessage('Esta placa ya está registrada. Ingresa una placa diferente.');
            
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);

            return
        }
    
        // Proceso de registro de moto
        if (tipoVehiculo === 'moto') {
            const nuevaMoto = {
                cedulaEmpleado,
                tipoVehiculo,
                placa,
                marca,
                cilindraje
            };
            agregarMoto(nuevaMoto);
        } else {
            // Proceso de registro de carro
            const nuevoCarro = {
                cedulaEmpleado,
                tipoVehiculo,
                placa,
                modelo,
                marca
            };
            agregarCarro(nuevoCarro);
        }
    
        // Limpieza de campos y errores después del registro
        setCedulaEmpleado('');
        setPlaca('');
        setModelo('');
        setMarca('');
        setCilindraje('');

        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); 
        }
    };
    
    const verificarCedulaExistente = (cedula) => {
        const vehiculoConCedula = motosRegistradas.some((moto) => moto.cedulaEmpleado === cedula && moto.placa !== '') ||
                                  carrosRegistrados.some((carro) => carro.cedulaEmpleado === cedula && carro.placa !== '');
        return vehiculoConCedula;
    };
    
    const verificarPlacaExistente = (placa) => {
        const vehiculoAsociadoACedula = motosRegistradas.some((moto) => moto.placa === placa && moto.cedulaEmpleado !== '') ||
                                         carrosRegistrados.some((carro) => carro.placa === placa && carro.cedulaEmpleado !== '');
        return vehiculoAsociadoACedula;
    };

    return (
        <div>
            <h2>Formulario de Registro de Vehículo</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
            <label>
            Cédula del empleado:
            <input
                type="number"
                value={cedulaEmpleado}
                onChange={(e) => setCedulaEmpleado(e.target.value)}
            />
            </label>
            <label>
                Tipo de Vehículo:
                <select value={tipoVehiculo} onChange={(e) => setTipoVehiculo(e.target.value)}>
                    <option value="moto">Moto</option>
                    <option value="carro">Carro</option>
                </select>
            </label>
            <label>
                Placa del vehículo:
                <input
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                />
            </label>
            {tipoVehiculo === 'moto' && (
                <div>
                    <h3>Registro de Moto</h3>
                    <label>
                        Cilindraje:
                        <input
                            type="text"
                            value={cilindraje}
                            onChange={(e) => setCilindraje(e.target.value)}
                        />
                    </label>
                    <label>
                        Marca:
                        <input
                            type="text"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        />
                    </label>
                </div>
            )}
            {tipoVehiculo === 'carro' && (
                <div>
                     <h3>Registro de Carro</h3>
                    <label>
                        Modelo:
                        <input
                            type="text"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                    </label>
                    <label>
                        Marca:
                        <input
                            type="text"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        />
                    </label>
                </div>
            )}
            <button type="submit">Registrar Vehículo</button>
            </form>
        </div>
    );
};

export default FormularioRegistroVehiculo;