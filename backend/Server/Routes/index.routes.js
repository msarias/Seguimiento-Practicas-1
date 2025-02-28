const express = require('express');
const indexRoutes = express.Router();

// const aprendicesRoutes = require('./aprendicesRutas.js');
const reportes = require('./reporteRutas.js');
const usuarios = require('./usuariosRutas.js');
const certificados = require('./certificadosRutas.js')

// indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use('/reportes', reportes);
indexRoutes.use('/usuarios', usuarios);
indexRoutes.use('/certificados', certificados);

module.exports = indexRoutes;
