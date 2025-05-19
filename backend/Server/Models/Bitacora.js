// Models/Bitacoras.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Bitacoras = sequelize.define('Bitacoras', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
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
  },
  aprendiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'bitacora', // asegúrate que esta tabla existe
  timestamps: false
});


module.exports = Bitacoras;
