import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../login/Login';
import Register from '../login/Register';
import Bitacoras from '../bitacoras/MainContent';
import Inicio from '../inicio/Inicio';
import Usuarios from '../usuarios/Usuarios';
import Visitas from '../visitas/Visitas';
import Reportes from '../reportes/Reportes';
import Fichas from '../ficha/fichas';
import ForgotPassword from '../login/ForgotPassword';
import ResetPassword from '../login/ResetPassword';
import NotFound from './NotFound';
import Content from '../generales/Content';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/id" element={<Content />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/fichas" element={<Fichas />} />
        <Route path="/bitacoras" element={<Bitacoras />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Routing;