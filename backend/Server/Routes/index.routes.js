const express = require('express');
const indexRoutes = express.Router();

// const aprendicesRoutes = require('./aprendicesRutas.js');
const Reporte = require('./Reporte.js');
const usuarios = require('./usuariosRutas.js');
const Certificado = require('./Certificado.js');
const Visita = require('./Visita.js');

// indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use('/reportes', Reporte);
indexRoutes.use('/usuarios', usuarios);
indexRoutes.use('/certificados', Certificado);
indexRoutes.use('/visitas', Visita);

module.exports = indexRoutes;
