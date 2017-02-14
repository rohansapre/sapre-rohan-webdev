/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController(WebsiteService, $routeParams, $location) {
        var vm = this;

        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }
})();