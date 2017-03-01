/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService($http) {
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            var date = new Date();
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            page._id = date.getTime().toString();
            page.lastUpdated = date.toLocaleDateString('en-US', options);
            return $http.post("/api/website/" + websiteId + "/page", page);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        function updatePage(pageId, page) {
            var date = new Date();
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            page.lastUpdated = date.toLocaleDateString('en-US', options);
            return $http.put("/api/page/" + pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }
    }
})();