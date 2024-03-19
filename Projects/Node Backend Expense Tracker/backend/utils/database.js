const Sequelize = require('sequelize')

const sequelize = new Sequelize('expenses','root','mysql',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize