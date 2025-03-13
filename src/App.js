// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.js'
import MainContent from '../src/components/MainContent';
import Login from './components/Login/Login';
import Inicio from './pages/inicio';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route path='/MainContent' element={<MainContent/>}/>
        <Route path='/Inicio' element={<Inicio/>}/>
        <Route path='/Visitas' element={<Visitas/>}/>
        <Route path='/Reportes' element={<Reportes/>}/>
        
        
      </Routes>
    </Router>
  );
}

export default App;
