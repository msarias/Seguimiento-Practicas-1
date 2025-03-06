// App.js
import React from 'react';
import './App.js'
import MainContent from '../src/components/MainContent';
import Login from './components/Login/Login';
import Inicio from './pages/inicio';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/MainContent' element={<MainContent/>}/>
        <Route path='/Inicio' element={<Inicio/>}/>
      </Routes>
    </Router>
  );
}

export default App;
