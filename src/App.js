import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Inicio from './components/Inicio.jsx';
import MainContent from './components/MainContent.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/bitacoras" element={<MainContent />} />

      </Routes>
    </Router>
  );
}

export default App;