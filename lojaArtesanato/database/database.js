const Sequelize = require('sequelize');

const connection = new Sequelize ('lojaartesanato','root', '1234',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

