(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('SidenavController', SidenavController);

    SidenavController.$inject = ['$scope', '$state','$ocLazyLoad','ImageService'];

    function SidenavController ($scope, $state,$ocLazyLoad,ImageService) {
        var vm = this;
        
    }
})();
