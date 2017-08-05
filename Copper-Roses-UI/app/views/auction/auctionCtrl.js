(function () {
    'use strict';

    angular
        .module('auction')
        .controller('AuctionCtrl', AuctionCtrl);

    AuctionCtrl.$inject = ['$scope', '$http', 'RolesManager', 'SecHelper'];

    function AuctionCtrl($scope, $http, RolesManager, SecHelper) {
        var vm = this;

        vm.test = function () {
            console.log(localStorage.getItem('guid'));
            $http.get('views/fake-auth/credentials.json').then(function (data) {
                var s = JSON.stringify(data);
                localStorage.setItem('data2', s);
                var x = localStorage.getItem('data2');
                var wtf = JSON.parse(x);
                var adminSecret = wtf.data.user.secret;
                var username = wtf.data.user.username;
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('adminSecret', adminSecret);
                $scope.adminSecret = adminSecret;
                return adminSecret;
            }).then(function () {
                swal('success');
            });
        };

        vm.getSSHKey = function () {
            SecHelper.generatePrivateKey();
            SecHelper.generatePublicKey();
        };

        vm.getJWT = function () {
            SecHelper.createJWT();
        };




        vm.login = function() {
            SecHelper.createJWT();
            var JWT = sessionStorage.getItem('JWT');
            $http.get('http://127.0.0.1:8080/api/Admin').then(function (data) {
                vm.header = data.data;
                localStorage.setItem('server-response', vm.header.replace(/=/g, ''));
                console.log('Response from C-Sharp land: ' + vm.header);
            });
            var payload = {
                username: vm.username,
                secret: vm.password,
                guid: "05acc785-080a-9aae-dca9-92ed8bf21018",
                isAdmin: true
            };
            var pk = sessionStorage.getItem('private_key');
            var pub = sessionStorage.getItem('public_key');
            var sign = "".concat(pk, pub);
            var final = sign.replace(/[caryhawkinsisafuckingfaggot23]/ig, '');

            debugger;
            // btoa(JSON.stringify(header).replace(/=['"]+/g, ''))
            var header = localStorage.getItem('server-response');
            console.log(header);
            debugger;
            var login_JWT = btoa(JSON.stringify(payload).replace(/['"]+/g, ''));
            console.log(login_JWT);
            if (login_JWT === JWT) {
                RolesManager.adminify();
                swal({
                    title: 'Success',
                    type: 'success',
                    text: 'Successful Login',
                    allowOutsideClick: false,
                    showConfirmButton: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        location.reload();
                    }
                });

            } else {
                swal('There was a problem with your login');
            }
        }
    }
})();
