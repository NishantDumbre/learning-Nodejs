const controller = require('../controllers/controllers')
const express = require('express');
const router = express.Router()


router.get('/',controller.getBlogs)
router.post('/',controller.postBlogs)
router.delete('/:id',controller.deleteBlogs)
router.post('/:id',controller.addComments)

module.exports = router