/**
 * Created by rohansapre on 2/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteWidget = deleteWidget;

        function init() {
            var userId = $routeParams.uid;
            vm.userId = userId;
            var websiteId = $routeParams.wid;
            vm.websiteId = websiteId;
            var pageId = $routeParams.pid;
            vm.pageId = pageId;

            vm.getOptions = WidgetService.getOptions();
            vm.widget = WidgetService.findWidgetById($routeParams.wgid);
        }

        init();

        function update() {
            var widget = WidgetService.updateWidget(vm.widget._id, vm.widget);
            if (widget) {
                navigateToWidgets();
            } else {
                vm.error = "Failed to update widget";
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widget._id);
            navigateToWidgets();
        }

        function navigateToWidgets() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();