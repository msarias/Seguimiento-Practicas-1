const { DataTypes } = require('sequelize');
const Sequelize = require('../Config/db.js');
const Usuario = require('./Usuario.js'); // Import correcto

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
    },
    tipo: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "pendiente",
    },
    motivo: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
  },
  {
    tableName: 'visita',
    timestamps: false,
  }
);

// Asegúrate de que Usuario esté bien definido antes de esta línea
Visita.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Visita;
