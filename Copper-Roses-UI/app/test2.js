(function () {
    'use strict';

    angular
        .module('auth')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http', '$q', '$scope'];

    function AuthService($http, $q, $scope) {
        $scope.serviceBase = 'http://test.spire-web.com/';
        $scope.apiServiceBaseUri = $scope.serviceBase;
        $scope.clientId = 'Spire';

        $rootScope.isAuth = false;
        $rootScope.userName = '';
        $rootScope.useRefreshTokens = false;

        var load = {
            token: response.access_token,
            userName: response.userName,
            refreshToken: "",
            useRefreshTokens: false
        };

        function authentication() {
            $rootScope.isAuth = true;
        }

        function unAuthentication() {
            $rootScope.isAuth = false;
            $rootScope.userName = "";
            $rootScope.useRefreshTokens = false;
        }

        $rootScope.externalAuthData = {
            provider: "",
            userName: "",
            externalAccessToken: ""
        };
        var saveRegistration = function (registration) {
            logOut();
            return $http.post($scope.serviceBase + 'api/account/register', registration)
                .then(function (response) {
                    return response;
                });
        };

        var login = function (loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            if (loginData.useRefreshTokens) {
                data = data + "&client_id=" + $scope.clientId;
            }

            var deferred = $q.defer();
            $http.post($scope.serviceBase + 'token', data, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                    if (loginData.useRefreshTokens) {
                        localStorage.setItem('authorizationData', {
                            token: response.access_token,
                            userName: loginData.userName,
                            refreshToken: response.refresh_token,
                            useRefreshTokens: true
                        });
                    } else {
                        localStorage.setItem('authorizationData', {
                            token: response.access_token,
                            userName: loginData.userName,
                            refreshToken: "",
                            useRefreshTokens: false
                        });
                    }
                    $rootScope.isAuth = true;
                    $rootScope.userName = loginData.userName;
                    $rootScope.useRefreshTokens = loginData.useRefreshTokens;

                    deferred.resolve(response);
                },
                function (err, status) {
                    logOut();
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        var logOut = function () {
            localStorage.removeItem('authorizationData');
            unAuthentication();
        };
        function fillAuthData() {
            var authData = localStorage.getItem('authorizationData');
            if (authData) {
                $rootScope.isAuth = true;
                $rootScope.userName = authData.userName;
                $rootScope.useRefreshTokens = authData.useRefreshTokens;
            }
        }
        var refreshToken = function () {
            var deferred = $q.defer();
            var authData = localStorage.getItem('authorizationData');
            if (authData) {
                if (authData.useRefreshTokens) {
                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + clientId;
                    localStorage.removeItem('authorizationData');

                    $http.post($scope.serviceBase + 'token', data, {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function (response) {
                            localStorage.setItem('authorizationData', {
                                token: response.access_token,
                                userName: response.userName,
                                refreshToken: response.refresh_token,
                                useRefreshTokens: true
                            });
                            deferred.resolve(response);
                        },
                        function (err, status) {
                            logOut();
                            deferred.reject(err);
                        });
                }
            }
            return deferred.promise;
        };

        function obtainAccessToken(externalData) {
            var deferred = $q.defer();

            $http.get($scope.serviceBase + 'api/account/ObtainLocalAccessToken', {
                params: {provider: externalData.provider, externalAccessToken: externalData.externalAccessToken}
            }).then(function (response) {
                    localStorage.setItem('authorizationData', load);
                    authentication();
                    deferred.resolve(response);
                },
                function (err, status) {
                    logOut();
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function registerExternal(registerExternalData) {
            var deferred = $q.defer();
            $http.post($scope.serviceBase + 'api/account/registerexternal', registerExternalData)
                .then(function (response) {
                        localStorage.setItem('authorizationData', load);
                        authentication();
                        deferred.resolve(response);
                    },
                    function (err, status) {
                        logOut();
                        deferred.reject(err);
                    });
            return deferred.promise;
        }

        return {
            saveRegistration: saveRegistration,
            login: login,
            logOut: logOut,
            fillAuthData: fillAuthData, /** refactored */
            authentication: authentication, /** refactored */
            unAuthentication: unAuthentication,
            refreshToken: refreshToken,
            obtainAccessToken: obtainAccessToken,
            externalAuthData: externalAuthData, /** refactored */
            registerExternal: registerExternal /** refactored */
        };
    }
})();
