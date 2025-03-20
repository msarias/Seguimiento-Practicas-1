const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

// Modelo de usuarios (base para aprendices e instructores)
const Usuarios = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
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
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_empresa: {
        type: DataTypes.INTEGER,

    },
    contraseña: {
        type: DataTypes.STRING(70),
        allowNull: false,
    },
    identificacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'usuario',
    timestamps: false,
});

// Modelo de aprendices
// const Aprendices = sequelize.define('aprendices', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     id_usuario: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//             model: Usuarios,
//             key: 'id'
//         }
//     },
//     id_empresa: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     id_reporte: {
//         type: DataTypes.INTEGER,
//         allowNull: true, // Permitido NULL para pruebas
//     }
// }, {
//     tableName: 'aprendiz',
//     timestamps: false,
// });

// // Modelo de instructores
// const Instructores = sequelize.define('instructores', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     id_usuario: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Usuarios,
//             key: 'id'
//         }
//     },
//     especialidad: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
// }, {
//     tableName: 'instructor',
//     timestamps: false,
// });

// Exportación de los modelos
module.exports = Usuarios;

