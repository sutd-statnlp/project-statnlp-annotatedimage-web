(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar': {
                    templateUrl: 'app/layouts/navbar/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'pageload': {
                    templateUrl: 'app/layouts/pageload/pageload.html',
                    controller: 'PageloadController',
                    controllerAs: 'vm'
                },
                'sidenav': {
                    templateUrl: 'app/layouts/sidenav/sidenav.html',
                    controller: 'SidenavController',
                    controllerAs: 'vm'
                },
                'sidenav-right': {
                    templateUrl: 'app/layouts/sidenav-right/sidenav-right.html',
                    controller: 'SidenavRightController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
