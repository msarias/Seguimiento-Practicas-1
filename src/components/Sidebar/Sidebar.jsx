import '../Sidebar/Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <a href="visitas.html">
        <button>Visitas</button>
      </a>
      <a href="bitacoras.html">
        <button>Bitacoras</button>
      </a>
      <a href="certificacion.html">
        <button>Certificación</button>
      </a>
    </div>
  );
};
