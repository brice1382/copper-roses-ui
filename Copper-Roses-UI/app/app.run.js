(function () {
    'use strict';

    angular
        .module('copper-roses')
        .run(run);

    run.$inject = ['$rootScope', 'RolesManager', 'AuthSvc'];

    function run($rootScope, RolesManager, AuthSvc) {

        $rootScope.RolesManager = RolesManager;

        $rootScope.currentUser = localStorage.getItem('currentUser');

        AuthSvc.checkAuthOnRefresh();

        $rootScope.$on('$viewContentLoaded', function () {
            var JWT = sessionStorage.getItem('JWT');
            if(JWT != null) {
                RolesManager.adminify();
            }
        });
    }
})();
