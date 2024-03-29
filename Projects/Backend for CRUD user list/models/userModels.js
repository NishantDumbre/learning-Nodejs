const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    phone:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    }
})

module.exports = Users