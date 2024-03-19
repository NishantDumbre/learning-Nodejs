const Expenses = require('../models/models')

exports.getExpenses = (req, res, next) => {
    Expenses.findAll()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err))
}

exports.postExpenses = (req, res, next) => {
    let data = req.body
    Expenses.create({
        expense: data.expense,
        description: data.description,
        category: data.category
    })
        .then((result) => {
            res.json(result.dataValues)
        })
}

exports.deleteExpenses = (req, res, next) => {
    let deleteId = req.params.id
    Expenses.findAll({ where: { id: deleteId } })
        .then((result) => {
            return Expenses.destroy({ where: { id: deleteId } })
        })
        .then((response)=>{
            res.json(response)
        })
}


exports.getUpdateUser = (req, res, next) => {
    let updateId = req.params.id
    console.log(updateId)
    Expenses.findAll({ where: { id: updateId } })
        .then((user) => {
            res.json(user)
        })
}

exports.putUpdateUser = (req, res, next) => {
    let updateId = req.params.id
    Expenses.update(req.body, { where: { id: updateId } })
        .then(result=>{
            res.json(result.dataValues)
        })
}