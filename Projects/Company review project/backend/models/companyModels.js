const sequelize = require('../utils/database')
const Sequelize = require('sequelize')

const Company = sequelize.define('company',{
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

module.exports = Company