const express = require('express');
const indexRoutes = express.Router();

// const aprendicesRoutes = require('./aprendicesRutas.js');
const Reporte = require('./Reporte.js');
const usuarios = require('./Usuario.js');
const Visita = require('./Visita.js');
const Bitacora = require('./bitacoraRutas.js');


// indexRoutes.use('/aprendices', aprendicesRoutes);
indexRoutes.use('/reportes', Reporte);
indexRoutes.use('/usuarios', usuarios);

indexRoutes.use('/certificados', certificados);
indexRoutes.use('/bitacoras',Bitacora);

indexRoutes.use('/visitas', Visita);

module.exports = indexRoutes;
