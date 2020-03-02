const express = require("express");
const app = express();

//estou dizendo paro o express que o motor de html é o ejs
app.set('view engine','ejs');
app.use(express.static('public'))//para utilizar arquivos staticos

app.get("/",(req,res) =>{
    res.render("index")
})
app.get("/perguntar",(req,res) =>{
    res.render("perguntar");
})


app.listen(8080,() =>{
    console.log("App rodando...")
})