const express = require('express');
const indexRoutes = express.Router();

// const aprendicesRoutes = require('./aprendicesRutas.js');
const Reporte = require('./Reporte.js');
const usuarios = require('./usuariosRutas.js');
const certificados = require('./certificadosRutas.js');
const bitacoras = require('./bitacoraRutas.js');
// indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use('/reportes', Reporte);
indexRoutes.use('/usuarios', usuarios);
indexRoutes.use('/certificados', certificados);
indexRoutes.use('/bitacoras',bitacoras);

module.exports = indexRoutes;
