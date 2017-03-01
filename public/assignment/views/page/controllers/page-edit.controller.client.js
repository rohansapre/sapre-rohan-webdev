/**
 * Created by rohansapre on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (response) {
                vm.pages = response;
            });
            var pagePromise = PageService.findPageById($routeParams.pid);
            pagePromise.success(function (response) {
                vm.page = response;
            });
        }
        init();

        function update(newPage) {
            var promise = PageService.updatePage(newPage._id, newPage);
            promise.success(function (response) {
                if(response)
                    navigateToPages();
                else
                    vm.error = "Failed to create new page";
            });
        }

        function deletePage() {
            var promise = PageService.deletePage(vm.page._id);
            promise.success(function () {
                navigateToPages();
            });
        }

        function navigateToPages() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();