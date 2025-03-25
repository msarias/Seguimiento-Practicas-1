
// App.js

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from './components/MainContent';
import './App.css';
import './App.js';
import ForgotPassword from "./components/ForgotPassword.jsx";
import Inicio from "./components/Inicio.jsx";
import Login from './components/Login';
import Register from './components/Register.jsx';
import Certificacion from './components/certificacion.jsx';
import Reportes from './components/Reportes.jsx';




function App() {

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/MainContent' element={<MainContent />} />
          <Route path='/Inicio' element={<Inicio />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/bitacoras" element={<MainContent />} />
          <Route path="/certificacion" element={<Certificacion />} />
          <Route path="/reportes" element={<Reportes />} />
          

        </Routes>
      </Router>
    </div>
  )
};
export default App;


