/**
 * Created by rohansapre on 3/21/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(WidgetService, FlickrService, $routeParams, $location) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            var promise = WidgetService.findWidgetById($routeParams.wgid);
            promise.success(function (response) {
                vm.widget = response;
            });
        }
        init();

        function searchPhotos(searchText) {
            console.log(searchText);
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                })
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
            WidgetService
                .updateWidget(vm.widget._id, vm.widget)
                .then(function (response) {
                    if(response)
                        navigateToWidgets();
                    else
                        vm.error = "Failed to update new image";
                })
        }

        function navigateToWidgets() {
            var index = $location.path().lastIndexOf("/");
            $location.url($location.path().substring(0, index));
        }
    }
})();