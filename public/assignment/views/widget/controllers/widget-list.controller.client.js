/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController(WidgetService, $routeParams, $sce) {
        var vm = this;
        vm.checkSafeURL = checkSafeURL;
        vm.getSafeHTML = getSafeHTML;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
            console.log(vm.widgets);
        }
        init();

        function checkSafeURL(widgetUrl) {
            var parts = widgetUrl.split('/');
            var id = parts[parts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getSafeHTML(text) {
            return $sce.trustAsHtml(text);
        }
    }
})();