/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var q = require('q');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('Page', pageSchema);

// api
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    var deffered = q.defer();
    page._website = websiteId;
    pageModel.create(page, function (err, page) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(page);
    });
    return deffered.promise;
}

function findAllPagesForWebsite(websiteId) {
    var deffered = q.defer();
    pageModel.find({_website: websiteId}, function (err, pages) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(pages);
    });
    return deffered.promise;
}

function findPageById(pageId) {
    var deffered = q.defer();
    pageModel.findById(pageId, function (err, page) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(page);
    });
    return deffered.promise;
}

function updatePage(pageId, page) {
    var deffered = q.defer();
    pageModel.findByIdAndUpdate(pageId, page, function (err, page) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(page);
    });
    return deffered.promise;
}

function deletePage(pageId) {
    var deffered = q.defer();
    pageModel.findByIdAndRemove(pageId, function (err, page) {
        if(err)
            deffered.reject(err);
        else {
            page.remove();
            deffered.resolve(page);
        }
    });
    return deffered.promise;
}