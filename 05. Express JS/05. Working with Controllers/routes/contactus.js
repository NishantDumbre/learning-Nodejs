const express = require('express')
const router = express.Router()

const contactController = require('../controllers/contact')


router.get('/contactus',contactController.getContactus)

router.post('/contactus',contactController.postContactus)

router.get('/success',contactController.getSuccess)

module.exports = {
    router: router
}