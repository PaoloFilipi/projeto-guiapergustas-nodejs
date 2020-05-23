const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','senh@123',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;
