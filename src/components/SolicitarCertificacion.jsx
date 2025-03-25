import React from "react";

const Certifications = ({ certifications, addCertification }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Certificaciones</h2>
      <div className="mt-2 space-y-2">
        {certifications.map((cert, index) => (
          <div key={index} className="flex justify-between p-2 border rounded">
            <span>{cert}</span>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">Ver</button>
          </div>
        ))}
      </div>
      <button
        onClick={addCertification}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Solicitar certificación
      </button>
    </div>
  );
};

export default Certifications;