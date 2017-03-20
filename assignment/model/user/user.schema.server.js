/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var websiteModel = require('../website/website.model.server');
var pageModel = require('../page/page.model.server');
var widgetModel = require('../widget/widget.model.server');
var userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
    dateCreated: { type: Date, default: Date.now() }
}, {collection: 'user'});

userSchema.post('remove', function (next) {
    websiteModel.find({_user: this._id}, '_id', function (err, websites) {
        if(err == null) {
            pageModel.find({_website: {$in: websites}}, '_id', function (err, pages) {
                if(err == null) {
                    widgetModel.remove({_page: {$in: pages}}).exec();
                    pageModel.remove({_id: {$in: pages}}).exec();
                }
            });
            websiteModel.remove({_id: {$in: websites}}).exec();
        }
    })
});

module.exports = userSchema;