(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('SidenavController', SidenavController);

    SidenavController.$inject = ['$scope', '$state','$ocLazyLoad'];

    function SidenavController ($scope, $state,$ocLazyLoad) {
        var vm = this;
        
    }
})();
