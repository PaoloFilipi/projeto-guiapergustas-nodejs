const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','sua-senha-do-banco-mysql',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;
