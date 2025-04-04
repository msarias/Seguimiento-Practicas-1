import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from '../src/components/MainContent';
import Register from './components/Register.jsx'
import Login from './components/Login';
import ForgotPassword from "./components/ForgotPassword.jsx";
import Inicio from "./components/Inicio.jsx";
import Visitas from "./components/Visitas.jsx";
import Reportes from "./components/Reportes.jsx";
import ResetPassword from "./components/ResetPassword.jsx"
import './App.css';
import './App.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/MainContent' element={<MainContent />} />
          <Route path='/Inicio' element={<Inicio />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/visita" element={<Visitas />} />
          <Route path="/bitacoras" element={<MainContent />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;