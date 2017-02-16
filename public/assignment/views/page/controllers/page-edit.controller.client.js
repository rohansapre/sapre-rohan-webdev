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

        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            vm.pages = PageService.findPageByWebsiteId($routeParams.wid);
            vm.page = PageService.findPageById($routeParams.pid);
        }
        init();

        function update(newPage) {
            var page = PageService.updatePage(newPage._id, newPage);
            if(page) {
                navigateToPages();
            } else {
                vm.error = "Failed to create new page";
            }
        }

        function deletePage() {
            PageService.deletePage(vm.page._id);
            navigateToPages();
        }

        function navigateToPages() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();