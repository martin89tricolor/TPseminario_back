// Gettign the Newly created Mongoose Model we just created
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error
    try {
        console.log("Query",query)
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.getUserById = async function (id) {

    // Try Catch the awaited promise to handle the error
    try {
        var UserResult = await User.findById(id)
        // Return the Userd list that was retured by the mongoose promise
        return UserResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while getting User');
    }
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);

    var newUser = new User({
        comertialName: user.comertialName,
        email: user.email,
        password: hashedPassword,
        address: {
            address1: user.address1,
            province: user.province,
            city: user.city,
            phone: user.phone,
        },
        isAdmin: false,
        isGuest: false,
        avatar: '',
    });

    try {
        // Saving the User
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason
        console.log(e)
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {

    var id = {_id: user._id};

    try {
        //Find the old User Object by the Id
        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    try {
        var savedUser = await oldUser.$set({...user});
        savedUser.save();
        return savedUser;
    } catch (e) {
        console.error(e);
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        var token = jwt.sign({
            id: _details._id,
            email: _details.email,
            isAdmin: _details.isAdmin,
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason
        throw Error("Error while Login User")
    }

}

exports.deleteUsersById = async function (ids) {

    // Try Catch the awaited promise to handle the error
    try {
        var UserResult = await User.deleteMany({'_id': {$in: ids}});
        return UserResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving User');
    }
}
