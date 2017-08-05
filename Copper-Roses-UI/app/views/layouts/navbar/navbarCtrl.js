(function () {
    'use strict';

    angular
        .module('navbar')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$scope', 'RolesManager', 'AuthSvc'];

    function NavbarCtrl($scope, RolesManager, AuthSvc) {
        var vm = this;

        $scope.done = function () {
            debugger;
            swal({
                title: 'Are You Sure',
                type: 'warning',
                text: 'Are you sure you are \r\n done adding items?',
                allOutsideClick: false,
                showConfirmButton: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    RolesManager.unAdminify();
                    location.href = '#!/home';
                }
            });
        };

        $scope.logout = function () {
            AuthSvc.logout();
            location.href = '#!/login';

        }
    }
})();
