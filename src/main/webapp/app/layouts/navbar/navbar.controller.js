(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state','$ocLazyLoad'];

    function NavbarController ($scope, $state,$ocLazyLoad) {
        $ocLazyLoad.load('js/admin.js');
        var vm = this;
        
    }
})();
