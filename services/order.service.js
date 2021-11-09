// Gettign the Newly created Mongoose Model we just created
var Order = require('../models/Order.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getOrders = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit,
        sort: {$natural: -1},
    }
    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query",query)
        var Orders = await Order.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Orders;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Orders');
    }
}

exports.getOrderById = async function (id) {

    // Try Catch the awaited promise to handle the error
    try {
        var OrderResult = await Order.findById(id);
        return OrderResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Order');
    }
}

exports.createOrder = async function (order) {
    var newOrder = new Order({
        ...order,
    });

    try {
        // Saving the Order
        var savedOrder = await newOrder.save();
        return savedOrder;
    } catch (e) {
        // return a Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Order")
    }
}

exports.updateOrderStatus = async function (ids, nuevoEstado) {

    // Try Catch the awaited promise to handle the error
    try {
        var OrderResult = await Order.updateMany(
            {'_id': {$in: ids}},
            {estado: nuevoEstado}
        );
        return OrderResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while updating Orders');
    }
}
