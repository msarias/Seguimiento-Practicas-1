const Usuario = require('./Usuario'); // Importa Usuario
const Ficha = require('./Ficha'); // Importa Ficha

// Aquí se definen las asociaciones entre los modeloso
Ficha.hasMany(Usuario, {
    foreignKey: 'ficha',
    as: 'aprendices',
});

Usuario.belongsTo(Ficha, {
    foreignKey: 'ficha',
    as: 'datosFicha',

});