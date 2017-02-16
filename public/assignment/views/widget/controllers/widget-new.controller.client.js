/**
 * Created by rohansapre on 2/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.create = create;

        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        var pageId = $routeParams.pid;
        vm.pageId = pageId;

        function init() {
            vm.newWidgetHeader = {_id: "", widgetType: "HEADING", pageId: vm.pageId, size: 2, text: "New Header Text"};
            vm.newWidgetImage = {
                _id: "",
                widgetType: "IMAGE",
                pageId: vm.pageId,
                width: "100%",
                url: "http://lorempixel.com/400/200/"
            };
            vm.newWidgetYouTube = {
                _id: "",
                widgetType: "YOUTUBE",
                pageId: vm.pageId,
                width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E"
            };
            vm.newWidgetHTML = {_id: "", widgetType: "HTML", pageId: vm.pageId, text: "<p>Lorem ipsum</p>"};
        }
        init();

        function create(newWidget) {
            var widget = WidgetService.createWidget(pageId, newWidget);
            if(widget._id != "") {
                var index = $location.path().lastIndexOf("/");
                var navTo = $location.path().substring(0, index) + "/" + widget._id;
                $location.url(navTo);
            } else {
                vm.error = "Failed to create new widget";
            }
        }
    }
})();