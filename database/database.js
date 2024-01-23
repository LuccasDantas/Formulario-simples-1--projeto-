const Sequelize = require('sequelize')  //Importação do Sequelize

const connection = new Sequelize('guiaPerguntas','root','012345678', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection