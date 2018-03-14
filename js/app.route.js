(function() {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise('/main');

            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'views/todo.html',
                    controller: 'TodoController',
                    controllerAs: 'todo'
                });

        }]);

})();