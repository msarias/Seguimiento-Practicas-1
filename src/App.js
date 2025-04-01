
// App.js

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from './components/MainContent';
import './App.css';
import './App.js';
import ForgotPassword from "./components/ForgotPassword.jsx";
import Inicio from "./components/Inicio.jsx";
import Login from './components/Login';
import ResetPassword from "./components/ResetPassword.jsx";
import Visitas from "./components/Visitas.jsx";
import Register from "./components/Register.jsx";
import Reportes from "./components/Reportes.jsx";


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/MainContent' element={<MainContent />} />
          <Route path='/Inicio' element={<Inicio />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/visita" element={<Visitas />} />
          <Route path="/bitacoras" element={<MainContent />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/visitas" element={<Visitas />} />
          

        </Routes>
      </Router>
    </div>
  )
};
export default App;


