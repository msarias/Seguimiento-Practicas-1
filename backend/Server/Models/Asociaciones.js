const Usuario = require('./Usuario');
const Ficha = require('./Ficha');

Ficha.hasMany(Usuario, {
    foreignKey: 'ficha',
    as: 'aprendices',
});

Usuario.belongsTo(Ficha, {
    foreignKey: 'ficha',
    as: 'datosFicha',
});

