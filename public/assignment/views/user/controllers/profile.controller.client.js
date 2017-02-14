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

        var userId = $routeParams.uid;

        function init() {
            var user = UserService.findUserById(userId);
            if(user) {
                vm.user = user;
            } else {
                vm.error = "A user with this ID does not exist!"
            }
        }
        init();

        function update(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user) {
                vm.message = "User successfully updated!";
            } else {
                vm.error = "Unable to update user";
            }
        }
    }
})();