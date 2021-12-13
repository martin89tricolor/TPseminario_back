var OrderService = require('../services/order.service');
var Product = require('../models/Product.model');
var moment = require('moment');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getOrders = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Orders = await OrderService.getOrders({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Orders, message: "Succesfully Orders Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getOrdersByUser = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Orders = await OrderService.getOrders({'buyOrder.user.email': req.email}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Orders, message: "Succesfully Orders Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getOrderById = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    const filtro = req.params.id;
    try {
        var Order = await OrderService.getOrderById(filtro);
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Order, message: "Succesfully Order Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createOrder = async function (req, res, next) {
    // Req.Body contains the form submit values.
    const buyOrder = req.body;
    const errores = [];
    let huboError = false;
    // Nos quedamos con los ids de los productos seleccionados
    const ids = buyOrder.products.map((p) => p.product._id);
    // Me traigo los productos que tienen esos ids
    const db_products = await Product.find({'_id': {$in: ids}});

    // Checkeamos si hay suficiente stock para TODOS los productos
    buyOrder.products.forEach((p) => {
        const productoActual = db_products.find(db_product => db_product._id == p.product._id);
        if (productoActual.stock < p.quantity) {
            huboError = true;
            errores.push(`El producto ${p.product.nombre} tiene ${productoActual.stock} unidades disponibles pero se intentó comprar ${p.quantity}.`);
        }
        // Actualizamos el stock pero todavía NO lo guardamos.
        productoActual.stock -= p.quantity;
    });
    // Si hubo error en al menos uno, devolvemos mensaje de error con las cantidades inválidas
    if(huboError) {
        return res.status(400).json({status: 400, message: errores});
    }
    // Ahora si, creamos la orden...
    var newOrder = {
        buyOrder: buyOrder,
        cantidad: buyOrder.products.map(p => p.quantity).reduce((a,b) => (a+b), 0),
        fechadonacion: moment().format("DD/MM/YYYY"),
        fechaentrega: moment().add(2, "days").format("DD/MM/YYYY"),
        total: buyOrder.products.map(p => p.quantity * p.product.precio).reduce((a,b) => (a+b), 0),
        estado: 'Pendiente',
        estado2: 'Pendiente',
    }
    try {
        // Ahora sí updateamos los productos con el nuevo stock modificado.
        db_products.forEach(dbp => dbp.save());
        // Calling the Service function with the new object from the Request Body
        var createdOrder = await OrderService.createOrder(newOrder)
        return res.status(201).json({createdOrder, message: "Succesfully Created Order"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Order Creation was Unsuccesfull"})
    }
}

exports.updateOrderStatus = async function (req, res, next) {

    // Id and status is necessary for the update
    if (!req.body.ids || !req.body.estado) {
        return res.status(400).json({status: 400., message: "No se especificó los IDs o el nuevo Estado."});
    }

    try {
        var updatedOrders = await OrderService.updateOrderStatus(req.body.ids, req.body.estado)
        return res.status(200).json({status: 200, message: `Se modificaron ${updatedOrders.n} órdenes con el nuevo estado ${req.body.estado}.`})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.updateOrderStatus2 = async function (req, res, next) {

    // Id and status is necessary for the update
    if (!req.body.ids || !req.body.estado2) {
        return res.status(400).json({status: 400., message: "No se especificó los IDs o el nuevo Estado."});
    }

    try {
        var updatedOrders = await OrderService.updateOrderStatus2(req.body.ids, req.body.estado2)
        return res.status(200).json({status: 200, message: `Se solicitaron ${updatedOrders.n} remitos.  Será enviado a su casilla de e-mail en un plazo de 24 horas.`})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}