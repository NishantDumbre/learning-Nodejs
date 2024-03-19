const Sequelize = require('sequelize')

const sequelize = new Sequelize('booking','root','mysql',{
    dialect:"mysql",
    host:"localhost"
})

module.exports = sequelize