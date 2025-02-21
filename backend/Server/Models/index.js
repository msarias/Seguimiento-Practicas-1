const Sequelize = require('sequelize');
const sequelize = require('../Config/db')

const Bitacora = require('../Models/Bitacora');
const Aprendiz = require('../Models/Aprendiz');

//Asociaciones de Aprendiz-Bitacora
Aprendiz.hasMany(Bitacora, {
    foreignKey: 'id_aprendiz',
})
Bitacora.belongsTo(Aprendiz, {
    foreignKey: 'id_aprendiz',
});

module.exports = {
    Aprendiz,
    Bitacora
}


