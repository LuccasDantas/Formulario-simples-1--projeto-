const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('pergunta',{   // Model como objeto em Js para criar tabela no db
    
    titulo:{
        type: Sequelize.STRING,
        allowNull: false                         // Para que o campo não fique VAZIO
    },

    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(()=>{})    // Sincronizar o que está nesse código com o db

module.exports = Pergunta
