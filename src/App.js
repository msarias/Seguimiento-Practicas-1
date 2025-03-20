// App.js
import React from 'react';
import './App.js'
import MainContent from '../src/components/MainContent';
import Login from './components/Login';
import Header from './components/Header';
import Content from './components/Content';
import Login from './components/Login/Login';
import Inicio from './pages/inicio';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/MainContent' element={<MainContent />} />
          <Route path='/Inicio' element={<Inicio />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;