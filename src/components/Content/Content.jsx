import "../Content/Content.css";

export default function Content() {
  return (
    <div className="content">
      <div className="info-section">
        <img src="./css/img/foto-persona.png" alt="Profile image" />
        <div>
          <h2>Información del Aprendiz</h2>
          <p>Nombre del aprendiz, detalles del perfil, etc.</p>
        </div>
      </div>
      <div className="pending-info-section">
        <h3>Información pendiente del aprendiz</h3>
        <p>
          Aquí va la información sobre las tareas o actividades pendientes del
          aprendiz.
        </p>
      </div>
    </div>
  );
};
