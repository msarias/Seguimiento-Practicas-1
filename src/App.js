// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.js'
import MainContent from '../src/components/MainContent';
import Login from "./components/Login.jsx";
import Inicio from "./components/Login.jsx";
import Reportes from "./components/Reportes/Reportes.jsx";
import Visitas from "./components/Visitas/Visitas.jsx";
import './App.css';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route path='/MainContent' element={<MainContent/>}/>
        <Route path='/Inicio' element={<Inicio/>}/>
        <Route path='/Visitas' element={<Visitas/>}/>
        <Route path='/Reportes' element={<Reportes/>}/>
        
        
      </Routes>
      </BrowserRouter>
  );
}

export default App;
