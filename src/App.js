
// App.js
<<<<<<< HEAD
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from '../src/components/MainContent';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
// import Login from './components/Login.jsx';
// import Inicio from './components/Inicio.jsx';
import Register from './components/Register.jsx'
// import RegisterForm from './components/RegisterForm';
>>>>>>> yefferson
import './App.css';
import './App.js';
import ForgotPassword from "./components/ForgotPassword.jsx";
import Inicio from "./components/Inicio.jsx";
import Login from './components/Login';


function App() {
<<<<<<< HEAD
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/MainContent' element={<MainContent />} />
          <Route path='/Inicio' element={<Inicio />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/bitacoras" element={<MainContent />} />
        </Routes>
      </Router>
    </div>
  )
};
export default App;
=======
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
>>>>>>> yefferson
