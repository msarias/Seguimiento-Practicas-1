const express = require('express');
const router = express.Router();
const Certificado = require('../Controllers/Certificado');

router.post('/', Certificado.crearCertificado);
router.get('/:id', Certificado.verCertificadoPorId);
router.get('/', Certificado.verCertificados);
router.put('/:id', Certificado.actualizarCertificado);
router.delete('/:id', Certificado.eliminarCertificadoPorId);

module.exports = router;