(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('SidenavRightController', SidenavRightController);

    SidenavRightController.$inject = ['$scope', '$state', '$ocLazyLoad', 'ImageService'];

    function SidenavRightController($scope, $state, $ocLazyLoad, ImageService) {
        var vm = this;

        vm.image = {
            image_id: null,
            image_rl: null,
            objects: []
        };
        vm.clickItem = clickItem;

        loadImages();

        function loadImages() {
            ImageService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                vm.image = data[0];
            }
        }

        function onError(error) {
            console.log(error);
        }

        function clickItem($event) {
            $('.rightsidebar li').removeClass('active');
            var item = angular.element($event.currentTarget);
            item.addClass('active');
        }
    }
})();