var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var OrderSchema = new mongoose.Schema({
    buyOrder: {
        user: {
            comertialName: String,
            email: String,
            cuit: String,
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
})

OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;
