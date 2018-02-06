(function() {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state','$ocLazyLoad'];

    function HomeController ($scope, $state,$ocLazyLoad) {
        $ocLazyLoad.load('plugins/dropzone/dropzone.js').then(function() {
            $ocLazyLoad.load('js/pages/forms/advanced-form-elements.js');
        });
       
        var vm = this;
        
    }
})();
