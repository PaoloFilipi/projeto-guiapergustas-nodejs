const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const connection = require("./database/database")

//Database

connection
    .authenticate().then(() => {
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
    res.render("index")
})

app.get("/perguntar",(req,res) =>{
    res.render("perguntar");
})

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido, titulo: " +titulo+" descrição: " + descricao);
})

app.listen(8080,() =>{
    console.log("App rodando...")
})