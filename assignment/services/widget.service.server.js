/**
 * Created by rohansapre on 2/28/17.
 */
module.exports = function (app, widgetModel) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/options", getOptions);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", reorderWidget);

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
        var pageId = req.params.pageId;
        var newWidget = req.body;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function getOptions(req, res) {
        res.json(options);
    }

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        widgetModel
            .reorderWidget(pageId, start, end)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
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