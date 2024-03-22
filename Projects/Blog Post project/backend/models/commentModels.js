const sequelize = require('../utils/database')
const Sequelize = require('sequelize')

const Comments = sequelize.define('comments',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    comment:Sequelize.STRING
})

module.exports = Comments