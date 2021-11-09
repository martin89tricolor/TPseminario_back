// Gettign the Newly created Mongoose Model we just created
var Product = require('../models/Product.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getProducts = async function (query, ordenamiento, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit,
        sort: ordenamiento ? {precio: ordenamiento} : undefined,
    }
    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query",query)
        var Products = await Product.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Products;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.getLatestProducts = async function () {

    // Try Catch the awaited promise to handle the error
    try {
        var Products = await Product.find().sort({$natural: -1}).limit(4);
        return Products;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Products');
    }
}

exports.getLatestEnlatados = async function () {

    // Try Catch the awaited promise to handle the error
    try {
        var Products = await Product.find({categoria: 'Enlatado'}).sort({$natural: -1}).limit(4);
        return Products;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Products');
    }
}

exports.getLatestEmbotellados = async function () {

    // Try Catch the awaited promise to handle the error
    try {
        var Products = await Product.find({categoria: 'Embotellado'}).sort({$natural: -1}).limit(4);
        return Products;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Products');
    }
}

exports.getProductById = async function (id) {

    // Try Catch the awaited promise to handle the error
    try {
        var ProductResult = await Product.findById(id);
        return ProductResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Product');
    }
}

exports.deleteProductsById = async function (ids) {

    // Try Catch the awaited promise to handle the error
    try {
        var ProductResult = await Product.deleteMany({'_id': {$in: ids}});
        return ProductResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Product');
    }
}

exports.updateProduct = async function (product) {

    var id = {_id: product._id};

    try {
        //Find the old Product Object by the Id
        var oldProduct = await Product.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Product")
    }
    // If no old Product Object exists return false
    if (!oldProduct) {
        return false;
    }
    //Edit the Product Object
    try {
        var savedProduct = await oldProduct.$set({...product});
        savedProduct.save();
        return savedProduct;
    } catch (e) {
        console.error(e);
        throw Error("And Error occured while updating the Product");
    }
}

exports.createProduct = async function (product) {

    var newProduct = new Product(product);

    try {
        // Saving the Product
        var savedProduct = await newProduct.save();
        return savedProduct;
    } catch (e) {
        // return a Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Product")
    }
}

exports.getFilters = async function () {

    // Try Catch the awaited promise to handle the error
    try {
        var zonas = await Product.distinct('zona');
        var marcas = await Product.distinct('marca');
        var categorias = await Product.distinct('categoria');
        var fechas = await Product.distinct('fecha');
        // Return the Userd list that was retured by the mongoose promise
        return {
            zonas,
            marcas,
            categorias,
            fechas,
        };

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}
