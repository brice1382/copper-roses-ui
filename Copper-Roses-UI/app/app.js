'use strict';

// Declare app level module which depends on views, and components
angular.module('copper-roses', [
    'ngRoute',
    'navbar',
    'home',
    'auction',
    'manage',
    'login',
    'auth',
    'sp-manager',
    'rw.moneymask',
    'version',
    'footer'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

    $routeProvider.when('/home', {
        templateUrl: 'views/home/home-tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'hm'
    }).when('/login', {
        templateUrl: 'views/login/login-tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'lc'
    }).when('/auction', {
        templateUrl: 'views/auction/auction-tpl.html',
        controller: 'AuctionCtrl',
        controllerAs: 'ap'
    }).when('/manage', {
        templateUrl: 'views/manage/manage-tpl.html',
        controller: 'ManageCtrl',
        controllerAs: 'mg'
    }).otherwise({redirectTo: '/login'});
}]);
