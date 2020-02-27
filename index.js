const express = require("express");
const app = express();

//estou dizendo paro o express que o motor de html é o ejs
app.set('view engine','ejs');

app.get("/",(req,res) =>{
    var nome = "Paolo Filipi";
    var lang = "Python";
    var exibirMsg =false;
    res.render("index",{
        nome:nome,
        lang: lang,
        empresa: "Recebe Descongelando",
        inscritos: 10000000,
        msg:exibirMsg
    })
})


app.listen(8080,() =>{
    console.log("App rodando...")
})