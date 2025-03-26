const express = require('express');
const indexRoutes = express.Router();

// const aprendicesRoutes = require('./aprendicesRutas.js');
const Reporte = require('./Reporte.js');
const usuarios = require('./Usuario.js');
const Visita = require('./Visita.js');

// indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use('/reportes', Reporte);
indexRoutes.use('/usuarios', usuarios);
indexRoutes.use('/visitas', Visita);

module.exports = indexRoutes;
