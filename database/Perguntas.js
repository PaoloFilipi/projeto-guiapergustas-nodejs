const Sequelize = require('sequelize');
const connection = require("./database");

//Definindo o model
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false // impede que deixe null
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false


    }
});

Pergunta.sync({force:false}).then(() =>{
    console.log("banco criado com sucesso");
}).catch((erro) =>{
    console.log("Houve um erro "+ erro);
})

module.exports = Pergunta;