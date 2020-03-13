const Sequelize = require('sequelize');
const connection = require("./database");

//Definindo o model
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: true // impede que deixe null
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: true


    }
});

Pergunta.sync({force:false}).then(() =>{
    console.log("banco criado com sucesso");
}).catch((erro) =>{
    console.log("Houve um erro "+ erro);
})

module.exports = Pergunta;