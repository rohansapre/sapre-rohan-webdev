/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getSizes": getSizes,
            "updateWidgetOrder": updateWidgetOrder
        };
        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/" + widgetId);
        }

        function getSizes() {
            return $http.get("/api/widget/options");
        }

        function updateWidgetOrder(pageId, start, end) {
            return $http.put("/page/" + pageId + "/widget?start=" + start + "&end=" + end);
        }
    }
})();