(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['AuthSvc', 'RolesManager'];

    function LoginCtrl(AuthSvc, RolesManager) {
        vm.login = function () {
            localStorage.setItem('currentUser', vm.username);
            AuthSvc.login();
            RolesManager.adminify();
            location.href = '#!/home';
        };

        vm.logsins = function () {
            var vm = this;
            var payload = {
                Username: vm.username,
                Secret: vm.password,
                guid: "05acc785-080a-9aae-dca9-92ed8bf21018",
                isAdmin: true
            };
            var login_JWT = btoa(JSON.stringify(payload).replace(/['"]+/g, ''));
            console.log(login_JWT);
        };
    }
})();
