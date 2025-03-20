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
        allowNull: false,
        /* validate: {
            isDate: true,
            isBefore: new Date().toISOString().split('T')[0],
        }, */
    },
    archivo: {
        type: DataTypes.STRING(45),
        allowNull: true,
        /* validate: {
            notEmpty: true,
            len: [2,45]
        } */
    },
    codigo: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        /* validate: {
            isInt: true,
            notEmpty: true,
        } */
    }
}, {
    tableName: 'bitacora',
    timestamps: false,
    paranoid: false,
});

module.exports = Bitacora;