import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Importa React Router
import Login from './components/Login/Login';
import Visitas from './components/Visitas/Visitas.jsx';
import Inicio from "./Inicio";
import  "./components/Visitas/Visitas.css";
import './App.css';
import "./components/Sidebar/Sidebar.css";


function App() {
  return (
    <BrowserRouter>  {/* Envolvemos todo con BrowserRouter */}
      <Routes>
        {/* Ruta para el login */}
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        {/* Ruta para las visitas */}
        <Route path="/visitas" element={<Visitas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
