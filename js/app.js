angular.module('dosumApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'mainCtrl'
            })
            .state('reviews', {
                url: '/reviews/',
                templateUrl: 'views/reviews.html'
            })
            .state('activities', {
                url: '/activities/',
                templateUrl: 'views/activities.html'
            })
    });