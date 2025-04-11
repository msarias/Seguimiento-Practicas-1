const express = require("express");
const router = express.Router();
const {crearNotificacion} = require("../Controllers/Notificacion");

router.post('/',crearNotificacion);

module.exports = router;