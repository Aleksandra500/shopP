const express = require('express')
const router = express.Router()
const orderController = require('../controllers/ordersControllers')

router.route('/').get(orderController.orders)
module.exports = router;