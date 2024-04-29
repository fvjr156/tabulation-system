const DataTypes = require('sequelize')
const MySQLDatabase = require('../../configs/db/database_conf')

const Survey = MySQLDatabase.define('Surveys', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    survey_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    survey_creator: {
        type: DataTypes.STRING,
        allowNull: false
    },
    survey_createdate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    survey_filepath: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tb_surveys',
    freezeTableName: true,
    timestamps: false
})

module.exports = { Survey }

//TODO: paayos