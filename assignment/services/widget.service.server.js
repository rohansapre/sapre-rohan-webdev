/**
 * Created by rohansapre on 2/28/17.
 */
module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/options", getOptions);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", updateWidgetOrder);

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var options = [1,2,3,4,5,6];

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cd) {
            cd(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length-1];
            cb(null, 'widget_name_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        widgets.push(req.body);
        res.send(req.body);
    }

    function findAllWidgetsForPage(req, res) {
        var pageWidgets = widgets.filter(function (w) {
            return w.pageId == req.params.pageId;
        });
        if(pageWidgets)
            res.json(pageWidgets);
        else
            res.sendStatus(404);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });
        res.json(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets[w] = newWidget;
                res.json(widgets[w]);
                return;
            }
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function getOptions(req, res) {
        console.log(options);
        res.json(options);
    }

    function updateWidgetOrder(req, res) {
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    }

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        if(myFile) {
            var destination = myFile.destination;

            for (var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets[w].width = width;
                    widgets[w].url = req.protocol + '://' + req.get('host') + '/uploads/' + myFile.filename;
                    pageId = widgets[w].pageId;
                }
            }
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }
};