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
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            var optionPromise = WidgetService.getSizes();
            optionPromise.success(function (response) {
                vm.options = response;
            });
            var promise = WidgetService.findWidgetById($routeParams.wgid);
            promise.success(function (response) {
                vm.widget = response;
                console.log("Widget: " + vm.widget);
            });
        }
        init();

        function update() {
            var promise = WidgetService.updateWidget(vm.widget._id, vm.widget);
            promise.success(function (response) {
                if (response)
                    navigateToWidgets();
                else
                    vm.error = "Failed to update widget";
            });
        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(vm.widget._id);
            promise.success(function () {
                navigateToWidgets();
            });
        }

        function navigateToWidgets() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();