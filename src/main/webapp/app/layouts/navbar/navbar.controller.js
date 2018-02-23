(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', '$ocLazyLoad', 'ImageService', 'Upload', 'AnnotationService'];

    function NavbarController($scope, $state, $ocLazyLoad, ImageService, Upload, AnnotationService) {
        $ocLazyLoad.load('js/admin.js');
        var vm = this;

        vm.upload = upload;
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

        $(document).ready(function () {

            $('.m-scroll').click(function () {
                $('html, body').animate({
                    scrollTop: $($(this).attr('data-href')).offset().top - 80
                }, 500);
                return false;
            });
        });

        $('#btn-signout').click(globalSignOut);

        function upload(file) {
            AnnotationService.upload(file);
        }

    }

})();