const express = require("express");
const indexRoutes = express.Router();

// const aprendicesRoutes = require('./aprendicesRutas.js');
const Reporte = require("./Reporte.js");
const usuarios = require("./Usuario.js");
const Visita = require("./Visita.js");
const Bitacora = require("./bitacoraRutas.js");
const Empresa = require("./Empresa.js");
const AuthRutas = require("./authRutas.js");
const Nottificaciones = require("./Notificacion.js");

// indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use("/reportes", Reporte);
indexRoutes.use("/usuarios", usuarios);
indexRoutes.use("/bitacoras", Bitacora);
indexRoutes.use("/visitas", Visita);
indexRoutes.use("/empresas", Empresa);
indexRoutes.use("/auth",AuthRutas);
indexRoutes.use("/notificacion",Nottificaciones);

module.exports = indexRoutes;
