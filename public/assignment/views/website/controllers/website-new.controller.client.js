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

        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function create(newWebsite) {
            var website = WebsiteService.createWebsite(userId, newWebsite);
            if(website) {
                var index = $location.path().lastIndexOf("/");
                $location.url($location.path().substring(0, index));
            } else {
                vm.error = "Failed to create new website";
            }
        }
    }
})();