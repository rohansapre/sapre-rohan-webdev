/**
 * Created by rohansapre on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController(PageService, $routeParams, $location) {
        var vm = this;
        vm.create = create;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (response) {
                vm.pages = response;
            });
        }
        init();

        function create(newPage) {
            var promise = PageService.createPage(vm.websiteId, newPage);
            promise.success(function (response) {
                if(response) {
                    var index = $location.path().lastIndexOf("/");
                    $location.url($location.path().substring(0, index));
                } else
                    vm.error = "Failed to create new page";
            });
        }
    }
})();