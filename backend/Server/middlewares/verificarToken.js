const jwt = require("jsonwebtoken");
require("dotenv").config(); // Carga las variables del archivo .env

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usás tu variable de entorno
    req.user = decoded; // Ahora tenés acceso a req.user en cualquier controlador
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = verificarToken;
