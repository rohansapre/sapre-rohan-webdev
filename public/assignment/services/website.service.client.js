/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            var date = new Date();
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            website._id = date.getTime().toString();
            website.lastUpdated = date.toLocaleDateString('en-US', options);
            return $http.post("/api/user/" + userId + "/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/" + userId + "/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/" + websiteId);
        }

        function updateWebsite(websiteId, website) {
            var date = new Date();
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            website.lastUpdated = date.toLocaleDateString('en-US', options);
            return $http.put("/api/website/" + websiteId, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/" + websiteId);
        }
    }
})();