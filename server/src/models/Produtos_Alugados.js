// models se comunica o bd - realiza as operações de crud
const Sequelize = require('sequelize');
const db = require('./db_Seq');
const User = require('./User');
const Produto = require('./Produto');

const ProdutosAlugados = db.define('produtos_Alugados', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    produtoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
   
});

ProdutosAlugados.belongsTo(User, {foreignkey: 'userId', allowNull: false});
ProdutosAlugados.belongsTo(Produto, {foreignkey: 'produtoId', allowNull: false});
// criar a tabela
//ProdutosAlugados.sync();

// 2023-05-26 14:32:35
// subscreve tabela 
//ProdutosAlugados.sync({force: true});

module.exports = ProdutosAlugados;