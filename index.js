const express = require('express') // Importando o módulo do Express
const app = express();             // Criando instância do Express
const bodyParser = require('body-parser')  // Importando o body-parser
const connection = require('./database/database')  // Importando a conexão ao database
const Pergunta = require('./database/pergunta') // Importando o Model de pergunta 
const Resposta = require('./database/Resposta') // Importando o Model de resposta

// Database

connection
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso ao banco de dados!')
    })
    .catch((msgErro)=>{
        console.log(msgErro)
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'))

//Body parser 
app.use(bodyParser.urlencoded({extended: false}))  // Decodificar os dados enviados pelo o formulário
app.use(bodyParser.json())

//Rotas
app.get('/',(req,res) => {
    Pergunta.findAll({raw:true,order:[
        ['id','DESC']          // ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas => {   // findAll é equivalente ao SELECT * FROM perguntas (Buscar e visualizar algo)
        res.render('index',{
            perguntas: perguntas
        })
    })       
})


app.get('/perguntar',(req,res) => {
    res.render('perguntar')
})


app.post('/salvarpergunta',(req,res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({           // Equivalente ao INSERT INTO (Salvar no banco de dados)
        titulo: titulo,
        descricao: descricao

    }).then(() => {
        res.redirect('/')   // Retornar para a página principal após uma pergunta feita com sucesso
    })
})


app.get('/pergunta/:id',(req,res) => { 
    var id = req.params.id
    Pergunta.findOne({     // Método do Sequelize para busca única
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){  // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']   // Ordenação para respostas mais recentes
            ]

            }).then(respostas => {
                res.render('pergunta',{
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
           
        }else {  // Não encontrada
            res.redirect('/')
        }
    })        
})

app.post('/responder',(req,res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create ({              // Criando uma resposta 
        corpo: corpo,
        perguntaId: perguntaId

    }).then(()=> {
       res.redirect('/pergunta/' + perguntaId)  // Redirecionar para a página da pergunta respondida 
    })
})


//Abrindo servidor
app.listen(8782,() => {
    console.log('App rodando!')
})
