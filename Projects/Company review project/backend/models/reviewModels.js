const sequelize = require('../utils/database')
const Sequelize = require('sequelize')

const Reviews = sequelize.define('reviews',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    company: Sequelize.STRING,
    pros:Sequelize.STRING,
    cons:Sequelize.STRING
})

module.exports = Reviews