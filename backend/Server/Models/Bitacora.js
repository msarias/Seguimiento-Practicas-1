// Models/Bitacoras.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Bitacoras = sequelize.define('Bitacoras', {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  archivo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente'
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'bitacora', // asegúrate que esta tabla existe
  timestamps: false
});


module.exports = Bitacoras;
