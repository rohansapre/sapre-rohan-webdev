/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var pageModel = require('../page/page.model.server');
var widgetModel = require('../widget/widget.model.server');
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, red: 'User'},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
    dateCreated:  { type: Date, default: Date.now() }
}, {collection: 'website'});

websiteSchema.post('remove', function (next) {
    pageModel.find({_website: this._id}, '_id', function (err, pages) {
        if(err == null) {
            console.log("Pages" + pages);
            widgetModel.remove({_page: {$in: pages}}).exec();
            pageModel.remove({_id: {$in: pages}}).exec();
        }
    });
});

module.exports = websiteSchema;