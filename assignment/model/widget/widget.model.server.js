/**
 * Created by rohansapre on 3/17/17.
 */
var mongoose = require('mongoose');
var q = require('q');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('Widget', widgetSchema);

// api
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    var deffered = q.defer();
    widget._page = pageId;
    console.log("db create wid");
    widgetModel.findOne({_page: pageId})
        .sort('-position')
        .exec(function (err, lastWidget) {
            console.log(lastWidget);
            if(lastWidget)
                widget.position = lastWidget.position+1;
            else
                widget.position = 0;
            console.log(widget);
            widgetModel.create(widget, function (err, widget) {
                if(err)
                    deffered.reject(err);
                else {
                    console.log(widget);
                    deffered.resolve(widget);
                }
            });
        });
    return deffered.promise;
}

function findAllWidgetsForPage(pageId) {
    var deffered = q.defer();
    widgetModel.find({_page: pageId})
        .sort('position')
        .exec(function (err, widgets) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(widgets);
    });
    return deffered.promise;
}

function findWidgetById(widgetId) {
    var deffered = q.defer();
    widgetModel.findById(widgetId, function (err, widget) {
        if(err)
            deffered.reject(err);
        else {
            console.log("Found widget: " + widget);
            deffered.resolve(widget);
        }
    });
    return deffered.promise;
}

function updateWidget(widgetId, widget) {
    var deffered = q.defer();
    widgetModel.findByIdAndUpdate(widgetId, widget, function (err, widget) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(widget);
    });
    return deffered.promise;
}

function deleteWidget(widgetId) {
    var deffered = q.defer();
    widgetModel.findById(widgetId, function (err, widget) {
        if(err)
            deffered.reject(err);
        else {
            widgetModel.update({_page: widget._page, position: {$gt: widget.position}}, {$inc: {position: -1}}, {multi: true}, function (err, success) {
                if(err)
                    deffered.reject(err);
                else {
                    widgetModel.findByIdAndRemove(widgetId, function (err, widget) {
                        if(err)
                            deffered.reject(err);
                        else
                            deffered.resolve(widget);
                    });
                }
            });
        }
            // widgetModel.find({_page: widget._page})
            //     .where('position').gt(widget.position)
            //     .update({_page: widget._page, position: {$gt: widget.position}}, {$set: {position: }})
    });
    return deffered.promise;
}

function reorderWidget(pageId, start, end) {
    var deffered = q.defer();
    if(start < end) {
        widgetModel.update({_page: pageId, position: {$gt: start, $lte: end}}, {$inc: {position: -1}}, {multi: true}, function (err, success) {
            if(err)
                deffered.reject(err);
            else {
                widgetModel.findOneAndUpdate({_page: pageId, position: start}, {$set: {position: end}}, function (err, widget) {
                    if(err)
                        deffered.reject(err);
                    else
                        deffered.resolve(widget);
                });
            }
        });
    } else {
        widgetModel.update({_page: pageId, position: {$gte: end, $lt: start}}, {$inc: {position: 1}}, {multi: true}, function (err, success) {
            if(err)
                deffered.reject(err);
            else {
                widgetModel.findOneAndUpdate({_page: pageId, position: start}, {$set: {position: end}}, function (err, widget) {
                    if(err)
                        deffered.reject(err);
                    else
                        deffered.resolve(widget);
                });
            }
        });
    }
    return deffered.promise;
}