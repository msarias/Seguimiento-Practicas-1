import React, { useState } from "react";

const RequestCertification = ({ handleRequest }) => {
  const [tipo, setTipo] = useState("");
  const [motivo, setMotivo] = useState("");
  const [archivo, setArchivo] = useState(null);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Solicitud de certificación</h2>
      <input
        type="text"
        placeholder="Tipo de certificación"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        type="text"
        placeholder="Motivo de la solicitud"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        type="file"
        onChange={(e) => setArchivo(e.target.files[0])}
        className="w-full border p-2 mt-2"
      />
      <button
        onClick={() => handleRequest(tipo, motivo, archivo)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Solicitar
      </button>
    </div>
  );
};

export default RequestCertification;