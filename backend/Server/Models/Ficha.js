const { DataTypes } = require('sequelize');
const Sequelize = require('../Config/db');

const Ficha = Sequelize.define('Ficha', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
}, {
    tableName: 'ficha',
    timestamps: false,
});

module.exports = Ficha;
