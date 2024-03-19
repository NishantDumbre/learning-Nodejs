const { response } = require('express')
const Users = require('../models/userModels')

exports.getUsers = (req, res, next) => {
    Users.findAll().then((result) => {
        console.log(result)
        res.json(result)
    })
        .catch(err => console.log(err))
}

exports.postUsers = (req, res, next) => {
    let data = req.body
    Users.create({
        name: data.name,
        phone: data.phone,
        email: data.email
    })
        .then((result) => {
            console.log(result)
            res.json(result.dataValues);
        })
}

exports.deleteUser = (req, res, next) => {
    let deleteId = req.params.id
    Users.findAll({ where: { id: deleteId } })
        .then((user) => {
            return Users.destroy({ where: { id: deleteId } })
        })
        .then(result => console.log('deleted from db'))
}


exports.updateUser = (req, res, next) => {
    let editId = req.params.id
    Users.findAll({ where: { id: editId } })
        .then((user) => {
            res.json(user)
        })
}

exports.getUpdateUser = (req, res, next) => {
    let updateId = req.params.id
    Users.findAll({ where: { id: updateId } })
        .then((user) => {
            res.json(user)
        })
}

exports.putUpdateUser = (req, res, next) => {
    let updateId = req.params.id
    Users.update(req.body, { where: { id: updateId } })
        .then(result=>{
            res.json(result.dataValues)
        })
}