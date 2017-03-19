/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var types = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'];
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
    type: {type: String, enum: types},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: Date,
    position: Number
}, {collection: 'widget'});

module.exports = widgetSchema;