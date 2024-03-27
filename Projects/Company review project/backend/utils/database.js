const Sequelize = require('sequelize')

const sequelize = new Sequelize('databaseproject','root','mysql',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize