(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', '$ocLazyLoad', 'ImageService'];

    function NavbarController($scope, $state, $ocLazyLoad, ImageService) {
        $ocLazyLoad.load('js/admin.js');
        var vm = this;

        vm.images = [];
        vm.imageClick = imageClick;

        loadImages();

        function loadImages() {
            ImageService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                vm.images = data;
            }
        }

        function onError(error) {
            console.log(error);
        }

        function imageClick($event) {
            $('.m-menu-item').removeClass('m-item-active');
            var item = angular.element($event.currentTarget);
            item.addClass('m-item-active');
        }

    }
})();
