/**
 * Created by rohansapre on 2/28/17.
 */
module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        pages.push(req.body);
        res.send(req.body);
    }

    function findAllPagesForWebsite(req, res) {
        var websitePages = pages.filter(function (p) {
            return p.websiteId == req.params.websiteId;
        });
        if(websitePages)
            res.json(websitePages);
        else
            res.sendStatus(404);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id == pageId;
        });
        res.json(page);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages[p] = newPage;
                res.json(pages[p]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};