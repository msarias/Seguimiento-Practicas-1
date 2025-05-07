const Usuario = require('./Usuario'); // Importa Usuario
const Ficha = require('./Ficha'); // Importa Ficha
const Notificacion = require('./Notificacion'); // Importa Notificacion

// Asociación Ficha -> Usuarios
Ficha.hasMany(Usuario, {
    foreignKey: 'ficha',
    as: 'aprendices',
});

Usuario.belongsTo(Ficha, {
    foreignKey: 'ficha',
    as: 'datosFicha',
});

// Asociación Usuario -> Notificaciones
Usuario.hasMany(Notificacion, {
    foreignKey: 'id',
    as: 'notificaciones',
});

Notificacion.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario',
});
