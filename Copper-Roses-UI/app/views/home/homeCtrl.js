(function () {
    'use strict';

    angular.module('home')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope'];

    function HomeCtrl($scope) {
        var vm = this;

        vm.test = function () {
            var i, x;
            var result = (i + x === 85);
            for (i = 1, x = 1; i < 100, x < 100; i++, x++){
                if (i + x === 85) {
                    console.log(result);
                    // console.log('(' + i + ' = true' + ')');
                    return result;
                } else {
                    console.log('sorry');
                }
            }
            return i;
        }
    }
})();
