(function () {
    'use strict';

    angular
        .module('footer')
        .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['$scope'];

    function FooterCtrl($scope) {
        var vm = this;

        vm.date = new Date().getFullYear();
    }
})();
