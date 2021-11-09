var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var OrderSchema = new mongoose.Schema({
    buyOrder: {
        user: {
            comertialName: String,
            email: String,
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
    total: Number,
    estado: String,
})

OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;
