const express = require("express");
const router = express.Router();
const {Notificacion} = require("../Controllers/Notificacion");

router.post('/',Notificacion);

module.exports = router;