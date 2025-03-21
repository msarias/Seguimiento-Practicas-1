// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './components/Login.jsx';
import Inicio from './components/Inicio.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Inicio' element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
