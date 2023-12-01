import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import FormularioRegistroVehiculo from './FormularioRegistroVehiculo';
import FormularioIngresoParqueadero from './FormularioIngresoParqueadero';
import Parqueadero from './Parqueadero'

const Dashboard = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      // Redireccionar si no está autenticado después del renderizado
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Cerrar sesión</button>
      <FormularioRegistroVehiculo />
      <FormularioIngresoParqueadero />
      <Parqueadero />
    </div>
  );
};

export default Dashboard;