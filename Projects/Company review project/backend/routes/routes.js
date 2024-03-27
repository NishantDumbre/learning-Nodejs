const controller = require('../controllers/controllers')
const express = require('express');
const router = express.Router()


router.get('/:company',controller.getReviews)
router.post('/',controller.postReviews)
// router.delete('/:id',controller.deleteBlogs)
// router.post('/:id',controller.addComments)

module.exports = router