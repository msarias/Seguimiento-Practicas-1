const { DataTypes } = require("sequelize");
const Sequelize = require("../Config/db.js");

const Empresa = Sequelize.define(
  "Empresa",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(65),
      allowNull: false,
      validate: {
        len: [3, 65],
      },
    },
    direccion: {
      type: DataTypes.STRING(65),
      allowNull: false,
      validate: {
        len: [3, 65],
      },
    },
    encargado: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: [3, 45],
      },
    },
    contacto: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: [3, 45],
      },
    },
  },
  {
    tableName: "empresa",
    timestamps: false,
  }
);

module.exports = Empresa;
