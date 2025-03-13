const { DataTypes } = require('sequelize');
const Sequelize = require('../Config/db.js');

const Certificado = Sequelize.define('Certificado', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        // references: {
        //     model: 'aprendiz',
        //     key: 'id'
        // }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: true,
        // validate: {
        //     isIn: ['Activo', 'Pendiente']
        // }
    }
}, {
    tableName: 'certificacion',
    timestamps: false,
    paranoid: false,
});

module.exports = Certificado;
