/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var q = require('q');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('Website', websiteSchema);

// api
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    var deffered = q.defer();
    website._user = userId;
    websiteModel.create(website, function (err, website) {
        if(err)
            deffered.abort(err);
        else
            deffered.resolve(website);
    });
    return deffered.promise;
}

function findAllWebsitesForUser(userId) {
    var deffered = q.defer();
    websiteModel.find({_user: userId}, function (err, websites) {
        if(err)
            deffered.abort(err);
        else
            deffered.resolve(websites);
    });
    return deffered.promise;
}

function findWebsiteById(websiteId) {
    var deffered = q.defer();
    websiteModel.findById(websiteId, function (err, website) {
        if(err)
            deffered.abort(err);
        else
            deffered.resolve(website);
    });
    return deffered.promise;
}

function updateWebsite(websiteId, website) {
    var deffered = q.defer();
    websiteModel.findByIdAndUpdate(websiteId, website, function (err, website) {
        if(err)
            deffered.abort(err);
        else
            deffered.resolve(website);
    });
    return deffered.promise;
}

function deleteWebsite(websiteId) {
    var deffered = q.defer();
    websiteModel.findByIdAndRemove(websiteId, function (err, website) {
        if(err)
            deffered.abort(err);
        else
            deffered.resolve(website);
    });
    return deffered.promise;
}