/**
 * Created by rohansapre on 2/28/17.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {
        websites.push(req.body);
        res.send(req.body);
    }

    function findAllWebsitesForUser(req, res) {
        var userWebsites = websites.filter(function (w) {
            return w.developerId == req.params.userId;
        });
        if(userWebsites)
            res.json(userWebsites);
        else
            res.sendStatus(404);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == websiteId;
        });
        res.json(website);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites[w] = newWebsite;
                res.json(websites[w]);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};