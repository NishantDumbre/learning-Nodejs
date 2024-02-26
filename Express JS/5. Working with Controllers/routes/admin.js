const express = require('express')

const router = express.Router()
const productsController = require('../controllers/products.js')
// Importing the controller

router.get('/add-product',productsController.getAddProduct)

router.post('/add-product',productsController.postAddProduct)
// We keep the main logic of the code that will result in a view in a separate file. Imported the controller and passed it here. Go to ../controllers/products.js


module.exports={
    router:router
}