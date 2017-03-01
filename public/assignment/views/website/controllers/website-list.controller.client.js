/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController(WebsiteService, $routeParams) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (response) {
                vm.websites = response;
            });
        }
        init();
    }
})();