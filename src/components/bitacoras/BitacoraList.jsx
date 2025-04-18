import React, { useEffect, useState } from "react";
import axios from "axios";
import BitacoraForm from "./BitacoraForm";

const BitacoraList = () => {
  const [bitacoras, SetBitacoras] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerBitacoras();
  }, [bitacoras.length]);

  const obtenerBitacoras = async () => {
    try {
      const url = "http://localhost:3000/api/bitacoras/verBitacoras";
      const res = await axios.get(url);

      const data = res.data;

      if (!res.status === 200) {
        setError("No se pudieron obtener las bitácoras.");
      } else {
        console.log(data);
        SetBitacoras(data);
      }
    } catch (error) {
      setError("Ocurrió un error:", error.message);
    }
  };
};

const deleteBitacora = async (e) => {
  const id = e.target.id;

  try {
    const url = `http://localhost:3000/api/bitacoras/${id}`;
    const res = await axios.delete(url);

    if (res.status === 200) {
      console.log("Bitácora eliminada:", res.data);

      const updatedBitacoras = bitacoras.filter(
        (bitacora) => bitacora.id !== id
      );
      SetBitacoras(updatedBitacoras);
    } else {
      setError("No se pudo eliminar la bitácora");
    }
  } catch (error) {
    console.error("Error al configurar la solicitud:", error.message);
    setError("Ocurrió un error al eliminar la bitácora.");
  }
};

return (
  <section className="bitacora-list">
    <h2 className="bitacora-list__title">Bitácoras</h2>
    {error && <p className="error-message">{error}</p>}
    {bitacoras.length > 0 ? (
      bitacoras.map((b, index) => (
        <div className="report-list__item" key={index}>
          <b>{`Bitácora ${index + 1}`}</b>
          <p>{b.archivo || "Sin archivo"}</p>
          <p>{b.codigo || "Sin código"}</p>
          <p>{b.fecha || "Sin fecha"}</p>
          <button
            id={b.id}
            className="bitacora-list__button delete-button"
            onClick={deleteBitacora}
          >
            <img id="delete-img" src="../css/img/trash.png" alt="Eliminar" />
          </button>
        </div>
      ))
    ) : (
      <p>No hay bitácoras</p>
    )}
    <BitacoraForm />
  </section>
);

export default BitacoraList;