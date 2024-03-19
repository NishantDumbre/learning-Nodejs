const exp = require('constants')
const sequelize = require('../utils/database')
const Sequelize = require('sequelize')


const Expenses = sequelize.define('expenses',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      expense: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      }
})

module.exports = Expenses