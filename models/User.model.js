var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    comertialName: String,
    email: String,
    cuit: String,
    password: String,
    address: {
        address1: {type: String},
        province: {type: String},
        city: {type: String},
        cp: {type: Number},
        phone: {type: String}
    },
    isAdmin: Boolean,
    isGuest: Boolean,
    avatar: String,
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;
