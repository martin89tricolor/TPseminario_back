var express = require('express');
var router = express.Router();
const OrderController = require('../controllers/orders.controller');
var AdminAuthorization = require('../auth/admin_authorization');

// Rutas públicas
router.post('/', OrderController.createOrder);
// Rutas protegidas
router.get('/', AdminAuthorization, OrderController.getOrders);
router.get('/detail/:id', AdminAuthorization, OrderController.getOrderById);
router.post('/update-status', AdminAuthorization, OrderController.updateOrderStatus);
router.post('/update-status2', AdminAuthorization, OrderController.updateOrderStatus2);

module.exports = router;
