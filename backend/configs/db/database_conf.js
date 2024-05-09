const {Sequelize} = require('sequelize')
const database_conf = require('./mysql_conf')

const MySQLDatabase = new Sequelize(
    database_conf.database,
    database_conf.user,
    database_conf.password,
    {
        host: database_conf.host,
        dialect: database_conf.dialect,
        define: {
            freezeTableName: true,
            timestamps: false,
          },
    }
    
)

module.exports = MySQLDatabase