/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController(PageService, $routeParams) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (response) {
                vm.pages = response;
            });
        }
        init();
    }
})();