(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$ocLazyLoad', 'ImageService', 'RegionService', 'AnnotationService'];

    function HomeController($scope, $state, $ocLazyLoad, ImageService, RegionService, AnnotationService) {
        $ocLazyLoad.load('plugins/dropzone/dropzone.js').then(function () {
            $ocLazyLoad.load('js/pages/forms/advanced-form-elements.js');

        });
        $ocLazyLoad.load('js/pages/medias/image-gallery.js');

        var vm = this;
        vm.regions = [];
        vm.annotations = [];

        vm.image = {
            image_id: null,
            image_rl: null,
            objects: []
        };

        loadImages();
        loadAnnotations();
        loadRegions();


        function loadImages() {
            ImageService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                vm.images = data;
                vm.image = data[0];
            }
        }

        function loadRegions() {
            RegionService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                vm.regions = data[0].regions;
                injectAnnotationToRegion(vm.regions);
            }
            
        }

        function loadAnnotations() {
            AnnotationService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                vm.annotations = data[0].relationships;
            }
        }

        function injectAnnotationToRegion(regions) {
            for (var i = 0; i < regions.length; i++) {
                var item = regions[i];
                var annotation = getAnnotationByRegionId(item.region_id);
                if(annotation !== null)
                    item['annotation'] = annotation;
            }
        }

        function getAnnotationByRegionId(id) {
            for (var i = 0; i < vm.annotations.length; i++) {
                var item = vm.annotations[i];
                if (item.region_id === id)
                    return item.region_relations;
            }
            return null;
        }

        function onError(error) {
            console.log(error);
        }
    }
})();