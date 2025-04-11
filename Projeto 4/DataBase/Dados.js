const Sequelize = require("sequelize");
const connection = require("./database1");

const Dados = connection.define('dados', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type:Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type:Sequelize.STRING,
        allowNull: false
    }
});
Dados.sync({force: false}).then(() => {});

module.exports = Dados;