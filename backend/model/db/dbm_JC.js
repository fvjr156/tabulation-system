const DataTypes = require('sequelize')
const MySQLDatabase = require('../../configs/db/database_conf')

const Judge = MySQLDatabase.define('Judge', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judge_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tb_judges',
    freezeTableName: true,
    timestamps: false
})

const Contestant = MySQLDatabase.define('Contestant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contestant_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tb_contestant',
    freezeTableName: true,
    timestamps: false
})

module.exports = { Judge, Contestant }