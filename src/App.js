// App.js
import React from 'react';
import './App.js'
import MainContent from './components/MainContent.jsx';
import Login from './components/Login.jsx';
import Inicio from './components/Inicio.jsx';
import Header from './components/Header.jsx';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/MainContent' element={<MainContent/>}/>
        <Route path='/Inicio' element={<Inicio/>}/>
      </Routes>
    </Router>

  );
};

export default App;
