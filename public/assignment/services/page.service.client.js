/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

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
            page._id = (new Date()).getTime().toString();
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var websitePages = []
            for(var p in pages) {
                if(pages[p].websiteId == websiteId) {
                    websitePages.push(pages[p]);
                }
            }
            return websitePages;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages[p] = page;
                    return pages[p];
                }
            }
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages.splice(p, 1);
                }
            }
        }
    }
})();