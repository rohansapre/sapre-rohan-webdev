/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.create = create;

        function init() {
            vm.userId = $routeParams.uid;
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (response) {
                vm.websites = response;
            });
        }
        init();

        function create(newWebsite) {
            var promise = WebsiteService.createWebsite(vm.userId, newWebsite);
            promise.success(function (response) {
                if(response) {
                    var index = $location.path().lastIndexOf("/");
                    $location.url($location.path().substring(0, index));
                }
                else
                    vm.error = "Failed to create new website";
            });
        }
    }
})();