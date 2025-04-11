const Ficha = require('../Models/Ficha');
const Usuario = require('../Models/Usuario');

// Obtener todas las fichas
exports.obtenerFichas = async (req, res) => {
  try {
    const fichas = await Ficha.findAll();
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener fichas' });
  }
};

// Obtener aprendices por código de ficha
exports.obtenerAprendicesPorFicha = async (req, res) => {
  const { codigo } = req.params;
  try {
    const aprendices = await Usuario.findAll({
      where: {
        ficha: codigo,
        rol: 'aprendiz'
      }
    });
    res.json(aprendices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener aprendices' });
  }
};
