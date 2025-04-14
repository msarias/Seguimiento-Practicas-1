const Usuario = require('./Usuario'); // Importa Usuario
const Ficha = require('./Ficha'); // Importa Ficha

// Aquí se definen las asociaciones entre los modelos
Ficha.hasMany(Usuario, {
    foreignKey: 'ficha', // Asegúrate de que coincida con el campo 'ficha' en el modelo Usuario
    as: 'aprendices',
});

Usuario.belongsTo(Ficha, {
    foreignKey: 'ficha',
    as: 'datosFicha',
});