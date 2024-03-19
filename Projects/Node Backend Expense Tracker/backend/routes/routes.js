const express = require('express')

const controllers = require('../controllers/controllers')
const router = express.Router()

router.get('/:id', controllers.getUpdateUser)

router.put('/:id', controllers.putUpdateUser)

router.get('/', controllers.getExpenses)

router.post('/', controllers.postExpenses)

router.delete('/:id', controllers.deleteExpenses)



module.exports = router