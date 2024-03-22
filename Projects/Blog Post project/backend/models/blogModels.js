const sequelize = require('../utils/database')
const Sequelize = require('sequelize')

const Blogs = sequelize.define('blogs',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title: Sequelize.STRING,
    author:Sequelize.STRING,
    content:Sequelize.STRING
})

module.exports = Blogs