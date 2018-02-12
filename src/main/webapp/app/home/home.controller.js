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
        vm.region = {
            "height": 57,
            "image_id": 1,
            "phrase": "man has raised his arm",
            "region_id": 1736,
            "width": 67,
            "x": 372,
            "y": 274,
            "predicate": "",
            "annotation": {}
        };
        // vm.regions = [];
        vm.annotations = [];

        vm.image = {
            image_id: null,
            image_rl: null,
            objects: []
        };
        vm.getObjectNameById  = getObjectNameById;
        vm.chosenLabel = '';

        vm.chooseLabel = chooseLabel;
        vm.chooseObject = chooseObject;

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
            }
        }

        function loadAnnotations() {
            AnnotationService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                vm.annotations = data[0].relationships;
                injectAnnotationToRegion(vm.region);
            }
        }

        function injectAnnotationToRegion(item) {
            var annotation = getAnnotationByRegionId(item.region_id);
            if (annotation !== null) {
                loadRegionFromAnnotation(item, annotation);
            }
        }

        function loadRegionFromAnnotation(item, annotation) {
            item['predicate'] = annotation['predicate'];
            for (var key in annotation) {
                if (key !== 'predicate') {
                    item['annotation'][key] = annotation[key];
                }
            }
            $('#img-region').elevateZoom({
                zoomType: "lens",
                lensShape: "round",
                lensSize: 180,
                scrollZoom: true
            });
        }


        function getObjectNameById(id) {
            for (var i = 0; i < vm.image.objects.length; i++) {
                var item = vm.image.objects[i];
                if (item.object_id === id)
                    return item.names[0];
            }
            return null;
        }

        function getAnnotationByRegionId(id) {
            for (var i = 0; i < vm.annotations.length; i++) {
                var item = vm.annotations[i];
                if (item.region_id === id)
                    return item.region_relations;
            }
            return null;
        }

        function chooseLabel(label) {
            vm.choseLabel = label;
        }

        function chooseObject(objectId){
            console.log(objectId);
            vm.region['annotation'][vm.choseLabel] = objectId;
        }

        function onError(error) {
            console.log(error);
        }

        function hoverObject() {
            alert("sss");
        }

    }
})();
