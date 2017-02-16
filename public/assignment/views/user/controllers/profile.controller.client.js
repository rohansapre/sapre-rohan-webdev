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
            var user = UserService.findUserById($routeParams.uid);
            if(user) {
                vm.user = user;
            } else {
                vm.error = "A user with this ID does not exist!"
            }
        }
        init();

        function update(newUser) {
            var user = UserService.updateUser(vm.user._id, newUser);
            if(user) {
                vm.message = "User successfully updated!";
            } else {
                vm.error = "Unable to update user";
            }
        }

        function deleteUser() {
            console.log($location.path());
            console.log($location.url());
            UserService.deleteUser(vm.user._id);
            var index = $location.path().lastIndexOf("/");
            var path = $location.path().substring(0, index);
            index = path.lastIndexOf("/");
            $location.url(path.substring(0, index));
        }
    }
})();