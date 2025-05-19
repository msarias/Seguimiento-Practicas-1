const Usuario = require('./Usuario');
const Ficha = require('./Ficha');
const Notificacion = require('./Notificacion');
const Bitacora = require('./Bitacora');

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
    foreignKey: 'id_usuario',
    as: 'notificaciones',
});

Notificacion.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario',
});

// Asociación Usuario -> Bitácoras (aprendiz)
Usuario.hasMany(Bitacora, {
    foreignKey: 'aprendiz_id',
    as: 'bitacoras',
});

Bitacora.belongsTo(Usuario, {
    foreignKey: 'aprendiz_id',
    as: 'aprendiz',
});
