const ordersController = require('../controllers/ordersController')
const express = require('express')
const router = express.Router()


router.get('/', ordersController.getOrders)
router.get('/count', ordersController.getOrderCount)
router.post('/', ordersController.createOrder)
router.put('/:id', ordersController.updateOrder)
router.delete('/:id', ordersController.deleteOrder)
router.get('/:id', ordersController.getOrderById)
router.get('/totalsales', ordersController.getTotalSales)
router.get('/count', ordersController.getOrderCount)
router.get('/userorders/:userid', ordersController.getUserOrderList)


module.exports = router