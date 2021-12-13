var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var OrderSchema = new mongoose.Schema({
    buyOrder: {
        user: {
            comertialName: String,
            email: String,
            cuit: String,
        },
        address: {
            address1: String,
            province: String,
            city: String,
            zip: Number,
        },
        products: [{
            product: {
                img: String,
                marca: String,
                categoria: String,
                nombre: String,
            },
            quantity: Number,
        }]
    },
    cantidad: Number,
    fechadonacion: String,
    fechaentrega: String,
    estado: String,
    estado2: String,
})

OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;
