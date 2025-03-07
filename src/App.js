// App.js
import React from "react";
import "./App.js";
import "./App.css";
// import MainContent from '../src/components/MainContent';
// import Login from "./components/Login.jsx";
// import Inicio from "./Inicio.jsx";
import Container from './components/Container.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container />
    /* <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/inicio' element={<Inicio/>}/>
      </Routes>
    </Router> */
  );
}

export default App;
