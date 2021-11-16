var ProductService = require('../services/product.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getProducts = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var pageNumber = req.query.page ? req.query.page : 1
    var limitNumber = req.query.limit ? Number(req.query.limit) : 8;
    const {page, limit, ordenamiento, ...queryParams} = req.query;
    if(queryParams.nombre) {
        queryParams.nombre = new RegExp(queryParams.nombre, "gi");
    }
    try {
        var Products = await ProductService.getProducts(queryParams, ordenamiento, pageNumber, limitNumber)
        // Requiere ordenamiento?
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Products, message: "Succesfully Products Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getLatestProducts = async function (req, res, next) {

    try {
        var Products = await ProductService.getLatestProducts()
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Products, message: "Succesfully Products Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getLatestEmbotellados = async function (req, res, next) {

    try {
        var Products = await ProductService.getLatestEmbotellados()
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Products, message: "Succesfully Products Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getLatestEnlatados = async function (req, res, next) {

    try {
        var Products = await ProductService.getLatestEnlatados()
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Products, message: "Succesfully Products Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getProductById = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    const filtro = req.params.id;
    try {
        var Product = await ProductService.getProductById(filtro);
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Product, message: "Succesfully Product Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deleteProductsById = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    const ids = req.body.ids;
    try {
        const results = await ProductService.deleteProductsById(ids);
        const message = results.deletedCount === 1 ? `Se borró 1 publicación` : `Se borraron ${results.deletedCount} publicaciones`;
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({
            status: 200,
            data: results,
            message,
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateProduct = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "ID must be present"})
    }

    var Product = {
        ...req.body,
    }
    try {
        var updatedProduct = await ProductService.updateProduct(Product);
        return res.status(200).json({status: 200, data: updatedProduct, message: "Producto modificado."})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.createProduct = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Product = {
        ...req.body
    };
    try {
        // Calling the Service function with the new object from the Request Body
        var createdProduct = await ProductService.createProduct(Product)
        return res.status(201).json({status: 201, data: createdProduct, message: "Publicación Creada Exitosamente"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Error al crear la publicación"})
    }
}

exports.getFilters = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    try {
        var Filters = await ProductService.getFilters();
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Filters, message: "Succesfully Filters Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
