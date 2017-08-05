(function () {
    'use strict';

    angular
        .module('login')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$scope'];

    function LoginService($scope) {

    }
})();
