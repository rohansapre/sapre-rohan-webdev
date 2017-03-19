/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
    dateCreated: Date
}, {collection: 'user'});

module.exports = userSchema;