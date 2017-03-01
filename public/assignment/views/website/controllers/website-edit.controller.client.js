/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.userId = $routeParams.uid;
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (response) {
                vm.websites = response;
            });
            var websitePromise = WebsiteService.findWebsiteById($routeParams.wid);
            websitePromise.success(function (response) {
                vm.website = response;
            });
        }
        init();

        function update(newWebsite) {
            var promise = WebsiteService.updateWebsite(newWebsite._id, newWebsite);
            promise.success(function (response) {
                if(response)
                    navigateToWebsites();
                else
                    vm.error = "Unable to update website!"
            });
        }

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(vm.website._id);
            promise.success(function () {
                navigateToWebsites();
            });
        }

        function navigateToWebsites() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();