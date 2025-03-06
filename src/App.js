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
        <Route path='/inicio' element={<Inicio/>}/>
        <Route></Route>
      </Routes>
    </Router>

  );
};

export default App;
