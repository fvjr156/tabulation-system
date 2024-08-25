const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'database.sqlite3'),
    define: {
        timestamps: false // Disable timestamps globally
    }
});

module.exports = sequelize;