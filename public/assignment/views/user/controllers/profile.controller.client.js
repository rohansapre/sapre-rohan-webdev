/**
 * Created by rohansapre on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUserById($routeParams.uid);
            promise.success(function (response) {
                var user = response;
                if(user)
                    vm.user = user;
                else
                    vm.error = "A user with this ID does not exist!";
            });
        }
        init();

        function update(newUser) {
            var promise = UserService.updateUser(vm.user._id, newUser);
            promise.success(function () {
                vm.message = "User successfully updated!";
            });
            promise.error(function () {
                vm.error = "Unable to update user";
            });
        }

        function deleteUser() {
            var promise = UserService.deleteUser(vm.user._id);
            promise.success(function () {
                var index = $location.path().lastIndexOf("/");
                var path = $location.path().substring(0, index);
                index = path.lastIndexOf("/");
                $location.url(path.substring(0, index));
            });
            promise.error(function () {
                vm.error = "Unable to delete user";
            });
        }
    }
})();