const { DataTypes } = require('sequelize');
const Sequelize = require('../Config/db.js');

// Modelo de usuarios (base para aprendices e instructores)
const Usuario = Sequelize.define('Usuario', {
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
        }
    },
    apellidos: {
        type: DataTypes.STRING(65),
        allowNull: false,
        validate: {
            len: [3, 65],
            notEmpty: true,
        }
    },
    correo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        }
    },
    rol: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['aprendiz', 'instructor']]
        }
    },
    id_empresa: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        validate: {
            isInt: true,
        }
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

module.exports = Usuario;
