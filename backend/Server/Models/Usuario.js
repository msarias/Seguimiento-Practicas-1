const { DataTypes } = require('sequelize');
const Sequelize = require('../Config/db.js');

// Modelo de usuarios (base para aprendices e instructores)
const Usuario = Sequelize.define(
  'Usuario',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: {
      type: DataTypes.STRING(65),
      allowNull: false,
      validate: {
        len: [3, 65],
        notEmpty: true,
      },
    },
    apellidos: {
      type: DataTypes.STRING(65),
      allowNull: false,
      validate: {
        len: [3, 65],
        notEmpty: true,
      },
    },
    correo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    rol: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['aprendiz', 'instructor']],
      },
    },
    /* id_empresa: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      validate: {
        isInt: true,
        notEmpty: false,
      },
      defaultValue: null,
    }, */
    contraseña: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    identificacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    /* ficha: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      validate: {
        isInt: true,
        notEmpty: false,
      },
    }, */
  },
  {
    tableName: 'usuario',
    timestamps: false,
  }
);

module.exports = Usuario;