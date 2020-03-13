const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas");//importar meu model
const Resposta = require ("./database/Respostas");
//Database

connection.authenticate().then(() => {
    console.log("conexão feita com o banco de dados");
}).catch((erro) => {
    console.log(erro);
})


//estou dizendo paro o express que o motor de html é o ejs
app.set('view engine','ejs');
app.use(express.static('public'))//para utilizar arquivos staticos

//Body Parser
app.use(bodyParser.urlencoded({extended:false}))// esse trecho que permite a tradução(vai decodificar)
app.use(bodyParser.json());// permite que a gente leia dados de formulario enviados via json

//Rotas
app.get("/",(req,res) =>{
    //esse metodo é equivalente ao select * from 
    Pergunta.findAll({raw:true,order:[
        // como se fosse o order by
        ['id','desc']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas:perguntas
        })
    })
    
})

app.get("/perguntar",(req,res) =>{
    res.render("perguntar");
})

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // o create é equivalente ao insert into
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(() =>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req,res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){// pergunta encontrada
            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order:[['id','desc']]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas: respostas
                });

            })
        }else{// não encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    var dataHora = req.body.dataHora
    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    }).catch((erro) =>{
        console.log("ouve um erro e foi esse: "+erro);
    });
});

app.listen(8080,() =>{
    console.log("App rodando...")
})