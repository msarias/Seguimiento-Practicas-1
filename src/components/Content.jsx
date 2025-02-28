import ''

export default function Content() {
  return (
    <div class="content">
      <div class="info-section">
        <img src="./css/img/foto-persona.png" alt="Profile image" />
        <div>
          <h2>Información del Aprendiz</h2>
          <p>Nombre del aprendiz, detalles del perfil, etc.</p>
        </div>
      </div>
      <div class="pending-info-section">
        <h3>Información pendiente del aprendiz</h3>
        <p>
          Aquí va la información sobre las tareas o actividades pendientes del
          aprendiz.
        </p>
      </div>
    </div>
  );
};
