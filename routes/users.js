var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');
const OrderController = require('../controllers/orders.controller');
var Authorization = require('../auth/authorization');
var AdminAuthorization = require('../auth/admin_authorization');

// Rutas públicas
router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);
// Rutas con login
router.get('/orders', Authorization, OrderController.getOrdersByUser);
router.get('/detail/', Authorization, UserController.getActualUser);
router.put('/detail', Authorization, UserController.updateActualUser);
// Rutas para admin
router.get('/', AdminAuthorization, UserController.getUsers);
router.put('/', AdminAuthorization, UserController.updateUser);
router.delete('/', AdminAuthorization, UserController.removeUsers);

module.exports = router;
