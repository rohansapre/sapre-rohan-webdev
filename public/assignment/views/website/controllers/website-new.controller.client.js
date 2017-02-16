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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function create(newWebsite) {
            var website = WebsiteService.createWebsite(vm.userId, newWebsite);
            if(website) {
                var index = $location.path().lastIndexOf("/");
                $location.url($location.path().substring(0, index));
            } else {
                vm.error = "Failed to create new website";
            }
        }
    }
})();