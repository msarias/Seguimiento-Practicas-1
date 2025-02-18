const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Bitacoras = sequelize.define('bitacoras', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_aprendiz: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'aprendiz',
            key: 'id'
        }
    },
    nombre_bitacora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_bitacora: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    archivo: {
        type: DataTypes.STRING, // Aquí se guardará la ruta del archivo subido
        allowNull: true
    },
}, {
    tableName: 'bitacoras',
    timestamps: false,
});

module.exports = Bitacoras;
