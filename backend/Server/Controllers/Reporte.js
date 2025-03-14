const Reporte = require('../Models/Reporte');

exports.crearReporte = async (req, res) => {
  try {
    const { id_usuario, fecha, nombre } = req.body;
    const nuevoReporte = await Reporte.create({
      id_usuario,
      fecha,
      nombre,
    });
    res.status(201).json({ nuevoReporte });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verReportePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const reporte = await Reporte.findByPk(id);
    if (!reporte) {
      res.status(404).json({ message: 'El reporte no existe' });
    } else {
      res.status(200).json({ reporte });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verReportes = async (req, res) => {
  try {
    const reportes = await Reporte.findAll();
    if (reportes.length === 0) {
      res.status(404).json({ message: 'No existen reportes' });
    } else {
      res.status(200).json({ reportes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const reporte = await Reporte.findByPk(id);
    if (!reporte) {
      res.status(404).json({ message: 'El reporte no existe' });
    } else {
      await reporte.destroy();
      res.status(200).json({ message: 'Reporte eliminado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, fecha, nombre } = req.body;
    const reporte = await Reporte.findByPk(id);
    if (!reporte) {
      res.status(404).json({ message: 'El reporte no exite' });
    } else {
      reporte.update({ id_usuario, fecha, nombre });
      res.status(200).json({ message: 'Reporte actualizado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
