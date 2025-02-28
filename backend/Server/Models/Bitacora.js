const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Bitacora = sequelize.define('Bitacora', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_aprendiz: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'aprendiz',
            key: 'id'
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toISOString().split('T')[0],
        },
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2,45]
        }
    },
    numero_bitacora: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: true,
            notEmpty: true,
        }
    }
}, {
    tableName: 'bitacora',
    timestamps: false,
    paranoid: false,
});

module.exports = Bitacora;
