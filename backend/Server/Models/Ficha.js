const { DataTypes } = require('sequelize');
const Sequelize = require('../Config/db.js');

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
  programa: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}, {
  tableName: 'ficha',
  timestamps: false
});

module.exports = Ficha;
