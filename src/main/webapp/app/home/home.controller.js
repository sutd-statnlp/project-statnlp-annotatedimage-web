(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$ocLazyLoad', 'ImageService', 'RegionService', 'AnnotationService'];

    function HomeController($scope, $state, $ocLazyLoad, ImageService, RegionService, AnnotationService) {
        $ocLazyLoad.load('plugins/dropzone/dropzone.js').then(function () {
            $ocLazyLoad.load('js/pages/forms/advanced-form-elements.js');
            $ocLazyLoad.load('js/pages/ui/notifications.js');
        });

        var vm = this;
        vm.saveAnnotation = saveAnnotation;
        vm.chooseRegion = chooseRegion;
        var regions = [];
        var annotations = [];
        var images = [];
        vm.imageRegions = [];
        vm.annotation = {
            relationships: []
        };
        vm.region = {
            region_id: 'default'
        };
        vm.image = {
            image_id: null,
            image_rl: null,
            objects: []
        };
        vm.getObjectNameById = getObjectNameById;
        vm.chooseObject = chooseObject;

        loadImages();


        function loadImages() {
            ImageService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                images = data;
                vm.image = images[0];
                loadRegions(vm.image);
            }
        }

        function loadRegions(image) {
            RegionService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                regions = data;

                vm.imageRegions = getRegionsByImageId(image.image_id);
                $ocLazyLoad.load('js/pages/medias/image-gallery.js');

                vm.region = vm.imageRegions[0];
                vm.region["relations"] = {};
                loadAnnotations(vm.region);
            }
        }

        function loadAnnotations(region) {
            AnnotationService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                annotations = data;
                vm.annotation = annotations[0];
                injectAnnotationToRegion(region);
            }
        }

        function saveAnnotation() {
            var user = {
                user_name: globalUser.displayName,
                user_email: globalUser.email,
                created_time: new Date().getTime(),
                annotations: annotations
            };
            AnnotationService.save(user);
        }

        function injectAnnotationToRegion(item) {
            var relations = getRelationsByRegion(item);
            if (relations !== null) {
                loadRegionFromAnnotation(item, relations);
            }
        }

        function loadRegionFromAnnotation(item, relations) {
            item['predicate'] = relations['predicate'];
            for (var key in relations) {
                if (key !== 'predicate') {
                    item['relations'][key] = relations[key];
                }
            }
            $('#img-region').elevateZoom({
                zoomWindowWidth: 200,
                zoomWindowHeight: 240,
                lensFadeIn: 500,
                lensFadeOut: 500,
                scrollZoom: true,
                zoomType: "inner",
                cursor: "crosshair"
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

        function getRelationsByRegion(region) {
            for (var i = 0; i < vm.annotation.relationships.length; i++) {
                var item = vm.annotation.relationships[i];
                if (item.region_id === region.region_id) {
                    region['relationshipIndex'] = i;
                    return item.region_relations;
                }
            }
            return null;
        }

        function onError(error) {
            console.log(error);
        }

        function chooseObject(objectId) {
            var label = $('.m-region').attr('data-label');
            vm.region['relations'][label] = objectId;
            vm.annotation.relationships[vm.region.relationshipIndex].region_relations[label] = objectId;
        }

        function getRegionsByImageId(id) {
            for (var i = 0; i < regions.length; i++) {
                var item = regions[i];
                if (item.id === id)
                    return item.regions;
            }
            return null;
        }

        function chooseRegion(region) {
            vm.region = region;
            vm.region["relations"] = {};
            loadAnnotations(vm.region);

            $('html, body').animate({
                scrollTop: $('#annotation').offset().top - 80
            }, 500);
        }

        AnnotationService.subscribe($scope, function uploadAnnotationFileSucess() {
            var userAnnotation = AnnotationService.getUserNotification();
            if (userAnnotation.annotations !== null) {
                annotations = userAnnotation.annotations;
                vm.annotation = annotations[0];
                injectAnnotationToRegion(vm.region);
                $('#btn-noti-upload-sucess').click();
            }
        });

    }
})();