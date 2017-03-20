/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var widgetModel = require('../widget/widget.model.server');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}],
    dateCreated:  { type: Date, default: Date.now() }
}, {collection: 'page'});

pageSchema.post('remove', function () {
    widgetModel.remove({_page: this._id}).exec();
});

module.exports = pageSchema;