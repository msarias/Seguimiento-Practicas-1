const express = require('express');
const indexRoutes = express.Router();

// const aprendicesRoutes = require('./aprendicesRutas.js');
const reportes = require('./reporteRutas.js');
const usuarios = require('./usuariosRutas.js');

// indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use('/reportes', reportes);
indexRoutes.use('/usuarios', usuarios);

module.exports = indexRoutes;
