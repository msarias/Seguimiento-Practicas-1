import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from '../src/components/bitacoras/MainContent';
import Register from './components/login/Register';
import Login from './components/login/Login';
import ForgotPassword from './components/login/ForgotPassword';
import Inicio from './components//inicio/Inicio';
import Visitas from './components/visitas/Visitas';
import Fichas from './components/ficha/fichas';
import Reportes from './components/reportes/Reportes';
import ResetPassword from './components/login/ResetPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MainContent" element={<MainContent />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/fichas" element={<Fichas />} />
        <Route path="/bitacoras" element={<MainContent />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
}

export default App;