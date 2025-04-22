import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from '../bitacoras/MainContent';
import Register from '../login/Register';
import Login from '../login/Login';
import ForgotPassword from '../login/ForgotPassword';
import Usuarios from '../usuarios/Usuarios';
import Inicio from './Inicio';
import Visitas from '../visitas/Visitas';
import Fichas from '../ficha/fichas';
import Reportes from '../reportes/Reportes';
import ResetPassword from '../login/ResetPassword';
import NotFound from './NotFound';
import Content from '../generales/Content';

const Routing=() => {
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
        <Route path="/usuarios/id" element={<Content />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/fichas" element={<Fichas />} />
        <Route path="/bitacoras" element={<MainContent />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Routing;