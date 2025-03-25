const Content = () => {
  return (
    <div className="content">
      <section className="info-section">
        <img src="../css/img/user.png" alt="Profile" />
        <div>
          <h2>Información del Aprendiz</h2>
          <p>Nombre del aprendiz, detalles del perfil, etc.</p>
        </div>
      </section>
      <section className="pending-info-section">
        <h3>Información pendiente del aprendiz</h3>
        <p>
          Aquí va la información sobre las tareas o actividades pendientes del
          aprendiz.
        </p>
      </section>
    </div>
  );
};

export default Content;