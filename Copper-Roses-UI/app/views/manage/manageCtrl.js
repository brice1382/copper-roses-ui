(function () {
    'use strict';

    angular
        .module('manage')
        .controller('ManageCtrl', ManageCtrl);

    ManageCtrl.$inject = ['$scope'];

    function ManageCtrl($scope) {
        var vm = this;

        vm.max = 250;
        vm.characters = vm.max + ' Characters Left!!!';
        vm.textLength = vm.max;

        vm.description = {};

        vm.description.ngKeyup = function () {
            var textLeft = vm.max - vm.descriptionText.length;
            vm.characters = textLeft + ' Characters Left!!!';
        };

        vm.amount = '';

        vm.cancel = function () {
            swal({
                title: 'Are You Sure',
                type: 'warning',
                text: 'Are you sure you want \r\n to cancel your listing?',
                allOutsideClick: false,
                showConfirmButton: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    location.href = '#!/auction';
                }
            });
        };
    }
})();
