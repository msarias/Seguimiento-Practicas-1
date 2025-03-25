// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
// import Login from './components/Login.jsx';
// import Inicio from './components/Inicio.jsx';
import Register from './components/Register.jsx'
// import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  return ( 
      <Register></Register>
    // <Router>
    //   <Routes>
    //     <Route path='/Register' element={<RegisterForm />} />
    //     {/* <Route path='/' element={<Register />} /> */}
    //     {/* <Route path='/' element={<Login />} /> 
    //     <Route path='/Inicio' element={<Inicio />} />  */}
    //   </Routes>
    // </Router>
  );
}

export default App;
