import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthProvider';
import { VehiculoProvider } from './context/VehiculoProvider';
import ParqueaderoProvider from './context/ParqueaderoProvider';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <VehiculoProvider>
          <ParqueaderoProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </ParqueaderoProvider>
        </VehiculoProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;