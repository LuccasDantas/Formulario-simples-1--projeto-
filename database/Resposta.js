const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('Respostas', {

    corpo: { 
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {     // Relacionamento de tabelas ( uma RESPOSTA com uma PERGUNTA)
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force :false})

module.exports = Resposta