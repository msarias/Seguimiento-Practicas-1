const express = require('express');
const indexRoutes = express.Router();

const aprendicesRoutes = require('./aprendicesRutas.js');
const reportes = require('./reporteRutas.js');

indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use('/reportes', reportes);

module.exports = indexRoutes;
