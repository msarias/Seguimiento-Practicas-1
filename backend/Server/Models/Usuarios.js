const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');
const bcrypt = require("bcryptjs");

// Modelo de usuarios (base para aprendices e instructores)
const Usuarios = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('aprendiz', 'instructor'),
        allowNull: false,
    }
}, {
    tableName: 'usuario',
    timestamps: false,
});

// Modelo de aprendices
const Aprendices = sequelize.define('aprendices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_reporte: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permitido NULL para pruebas
    }
}, {
    tableName: 'aprendices',
    timestamps: false,
});

// Modelo de instructores
const Instructores = sequelize.define('instructores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    especialidad: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Usuarios',
    timestamps: false,
});

// Exportación de los modelos
module.exports = { Usuarios, Aprendices, Instructores };

