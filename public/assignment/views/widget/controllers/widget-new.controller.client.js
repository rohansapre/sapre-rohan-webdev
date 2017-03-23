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

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.newWidgetHeader = {type: "HEADING"};
            vm.newWidgetImage = {type: "IMAGE", url: "http://lorempixel.com/400/200/"};
            vm.newWidgetYouTube = {type: "YOUTUBE", url: "https://youtu.be/AM2Ivdi9c4E"};
            vm.newWidgetHTML = {type: "HTML"};
            vm.newWidgetText = {type: "TEXT"};
        }
        init();

        function create(newWidget) {
            var promise = WidgetService.createWidget(vm.pageId, newWidget);
            promise.success(function (response) {
                if(response._id != "") {
                    var index = $location.path().lastIndexOf("/");
                    var navTo = $location.path().substring(0, index) + "/" + response._id;
                    $location.url(navTo);
                } else
                    vm.error = "Failed to create new widget";
            });
        }
    }
})();