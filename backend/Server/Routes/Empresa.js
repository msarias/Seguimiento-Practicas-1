const express = require("express");
const router = express.Router();
const Empresa = require("../Controllers/Empresa");

router.get("/verEmpresas", Empresa.verEmpresas);
router.get("/:id", Empresa.verEmpresaPorId);
router.post("/", Empresa.crearEmpresa);
router.put("/:id", Empresa.actualizarEmpresa);
router.delete("/:id", Empresa.eliminarEmpresa);

module.exports = router;
