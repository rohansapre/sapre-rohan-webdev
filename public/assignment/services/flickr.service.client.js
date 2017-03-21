/**
 * Created by rohansapre on 3/21/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhotos": searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {
            var key = "2103f2c873d28c57636650837fda8b43";
            var secret = "21855d20b493ac19";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();