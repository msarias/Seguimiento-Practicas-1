const Empresa = require("../Models/Empresa");
const { notificarNuevaEmpresa } = require("../utils/NotificacionSistema");

exports.crearEmpresa = async (req, res) => {
  try {
    const { nombre, direccion, encargado, contacto } = req.body;
    const nuevaEmpresa = await Empresa.create({
      nombre,
      direccion,
      encargado,
      contacto,
    });
    //Notificacion
    const io = req.app.get("io");
    notificarNuevaEmpresa(io, nuevaEmpresa)

    res.status(201).json({ nuevaEmpresa });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verEmpresaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ message: "La empresa no está registrada" });
    }
    res.status(200).json({ empresa });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    if (empresas.length === 0) {
      return res.status(404).json({ message: "No hay empresas registradas" });
    }
    res.status(200).json({ empresas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, encargado, contacto } = req.body;
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ message: "El reporte no exite" });
    }
    await empresa.update({ nombre, direccion, encargado, contacto });
    res.status(200).json({ message: "Empresa actualizada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ message: "La empresa no está registrada" });
    }
    await empresa.destroy();
    res.status(200).json({ message: "Empresa eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
