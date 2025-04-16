const Ficha = require('../Models/Ficha');
const Usuario = require('../Models/Usuario');

const obtenerFichas = async (req, res) => {
  try {
    const fichas = await Ficha.findAll({
      include: [
        {
          model: Usuario,
          as: 'aprendices',
          attributes: ['id', 'nombres', 'apellidos', 'identificacion', 'correo'],
          where: { rol: 'aprendiz' }, // Solo los aprendices
          required: false,
        },
      ],
    });
    res.json(fichas);
  } catch (error) {
    console.error('Error al obtener fichas:', error.message);
    res.status(500).json({ error: 'Error al obtener las fichas' });
  }
};

module.exports = { obtenerFichas };
