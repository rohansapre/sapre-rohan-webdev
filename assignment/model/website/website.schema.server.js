/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, red: 'User'},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
    dateCreated:  { type: Date, default: Date.now() }
}, {collection: 'website'});

module.exports = websiteSchema;