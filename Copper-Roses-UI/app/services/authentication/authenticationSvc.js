(function () {
    'use strict';

    angular
        .module('auth')
        .service('AuthSvc', AuthSvc);

    AuthSvc.$inject = ['$rootScope'];

    function AuthSvc($rootScope) {
        var sv = this;

        $rootScope.isAuth = false;

        function authenticate() {
            $rootScope.isAuth = true;
        }

        function unauthenticate() {
            $rootScope.isAuth = false;
        }

        function login(USER_TOKEN) {
            var expDate = (1000 * 60 * 60 * 24 * 3);
            USER_TOKEN = new Date().getTime() + expDate;
            localStorage.setItem('USER_TOKEN', USER_TOKEN);
            $rootScope.currentUser = localStorage.getItem('currentUser');
            authenticate();
        }

        function logout() {
            localStorage.removeItem('USER_TOKEN');
            localStorage.removeItem('currentUser');
            unauthenticate()
        }

        function tokenExpired() {
            var USER_TOKEN = localStorage.getItem('USER_TOKEN');
            if (USER_TOKEN < (new Date().getTime())) {
                return true;
            }
            return false;
        }

        function checkAuthOnRefresh(USER_TOKEN) {
            $rootScope.$on('$locationChangeStart', function () {
                if (!tokenExpired()) {
                    authenticate();
                } else {
                    $rootScope.$broadcast('Token is expired', USER_TOKEN);
                }
            })
        }

        return {
            login: login,
            logout: logout,
            authenticate: authenticate,
            unauthenticate: unauthenticate,
            tokenExpired: tokenExpired,
            checkAuthOnRefresh: checkAuthOnRefresh
        }
    }
})();

