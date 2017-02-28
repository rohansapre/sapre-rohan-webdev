/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function init() {

        }
        init();

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function (response) {
                var loginUser = response;
                if(loginUser) {
                    $location.url("/user/" + loginUser._id);
                } else {
                    vm.error = "User not found";
                }
            });
        }
    }
})();