const express = require('express');
const router = express.Router();

const CertificadosController = require('../Controllers/CertificadosController');
//Rutas

router.post('/', CertificadosController.createCertificado);
router.get('/:id', CertificadosController.getCertificadoById);
router.get('/', CertificadosController.getAllCertificados);
router.put('/:id', CertificadosController.updateCertificado);
router.delete('/:id', CertificadosController.deleteCertificadoById);

module.exports = router;