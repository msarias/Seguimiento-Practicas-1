const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword,login } = require("../Controllers/authController");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword); // Solo POST para procesar la nueva contraseña
router.post("/login",login);

module.exports = router;
