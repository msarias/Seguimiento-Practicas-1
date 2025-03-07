// App.js
import React from "react";
import "./App.js";
// import MainContent from '../src/components/MainContent';
import Login from "./components/Login.jsx";
import Inicio from "./Inicio.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from "./components/Content.jsx";

function App() {
  return (
    <Content />
    /*  <Router>
      <Routes>
        <Route path='/inicio' element={<Inicio/>}/>
        <Route></Route>
      </Routes>
    </Router> */
  );
}

export default App;
