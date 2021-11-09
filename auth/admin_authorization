/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
var jwt = require('jsonwebtoken');
var config = require('../config').config();

var authorization = function (req, res, next) {

    var token = req.headers['x-access-token'];
    console.log("token",token);
    var msg = {auth: false, message: 'No token provided.'};
    if (!token)
        res.status(500).send(msg);

    let sec = process.env.SECRET;
    //console.log("secret",sec)
    jwt.verify(token, sec, function (err, decoded) {
        var msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err)
            res.status(500).send(msg);
        if (!decoded.isAdmin) {
            res.status(400).send("Esta URL solo puede ser usada por un Administrador.");
        }
        req.userId = decoded.id;
        req.email = decoded.email;
        next();
    });
}

module.exports = authorization;
