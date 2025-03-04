import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Importa React Router
import Login from './components/Login/Login';
import Visitas from './components/Visitas/Visitas.jsx';
import "./components/Visitas/Visitas.css";
import './App.css';

function App() {
  return (
    <BrowserRouter>  {/* Envolvemos todo con BrowserRouter */}
      <Routes>
        {/* Ruta para el login */}
        <Route path="/" element={<Login />} />

        {/* Ruta para las visitas */}
        <Route path="/visitas" element={<Visitas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
