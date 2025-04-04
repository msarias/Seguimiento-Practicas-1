const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Bitacora = sequelize.define('Bitacora', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
         validate: {
            isDate: true,
            isBefore: new Date().toISOString().split('T')[0],
        }, 
    },
    archivo: {
        type: DataTypes.STRING(45),
        allowNull: true,
        validate: {
          len: {
            args: [2, 45],
            msg: 'El nombre del archivo debe tener entre 2 y 45 caracteres.'
          }
        }
      },
      codigo: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'El código debe ser un número entero.'
          }
        }
      }
}, {
    tableName: 'bitacora',
    timestamps: false,
    paranoid: false,
});

module.exports = Bitacora;