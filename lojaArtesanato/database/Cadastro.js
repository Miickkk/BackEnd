const Sequelize = require ("sequelize");
const connection = require("./database");

const Cadastro = connection.define('cadastros',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    preco:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    imagem:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Cadastro.sync({force: false}).then(() => {});

module.exports = Cadastro;