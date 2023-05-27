// models se comunica o bd - realiza as operações de crud
const Sequelize = require('sequelize');
const db = require('./db_Seq');
const User = require('./User');

const Produto = db.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    disponivel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
})

Produto.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})

// criar a tabela
//Produto.sync();

module.exports = Produto;