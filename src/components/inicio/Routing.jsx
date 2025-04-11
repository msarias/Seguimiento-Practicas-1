import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from '../bitacoras/MainContent.jsx';
import Register from '../login/Register.jsx';
import Login from '../login/Login.jsx';
import ForgotPassword from '../login/ForgotPassword.jsx';
import Inicio from './Inicio.jsx';
import Usuarios from '../usuarios/Usuarios.jsx';
import Visitas from '../visitas/Visitas.jsx';
import Reportes from '../reportes/Reportes.jsx';
import ResetPassword from '../login/ResetPassword.jsx';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MainContent" element={<MainContent />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/bitacoras" element={<MainContent />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
};

export default Routing;