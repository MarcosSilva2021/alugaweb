// models se comunica o bd - realiza as operações de crud
const Sequelize = require('sequelize');
const db = require('./db_Seq');

const User = db.define('users', {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// criar a tabela
//User.sync();

module.exports = User;
