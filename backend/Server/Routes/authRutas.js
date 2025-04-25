const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword, login } = require("../Controllers/authController");
const verificarToken = require("../middlewares/verificarToken");

// Rutas públicas
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", login);

// Ruta protegida de ejemplo (podés eliminarla o moverla a otro router)
router.get("/check-auth", verificarToken, (req, res) => {
  res.json({ message: "Token válido", user: req.user });
});

module.exports = router;
