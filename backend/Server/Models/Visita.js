const { DataTypes } = require('sequelize');
const Sequelize = require('../Config/db.js');

const Visita = Sequelize.define(
  'Visita',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    tipo: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['Presencial', 'Telefónica', 'Virtual']],
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString(),
      },
    },
  },
  {
    tableName: 'visita',
    timestamps: false,
  }
);

module.exports = Visita;
