(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$ocLazyLoad', 'ImageService', 'RegionService', 'AnnotationService','DataService'];

    function HomeController($scope, $state, $ocLazyLoad, ImageService, RegionService, AnnotationService,DataService) {

        var vm = this;
        var regions = [];
        var annotations = [];
        var images = [];

        vm.saveAnnotation = saveAnnotation;
        vm.getObjectKeys = getObjectKeys;
        vm.nextRole = nextRole;
        vm.prevRole = prevRole;
        vm.chooseRole = chooseRole;
        vm.roleIndex = 0;
        vm.imageRegions = [];
        vm.regionIndex = 0;
        vm.annotation = {
            relationships: []
        };
        vm.region = {
            region_id: 'default'
        };
        vm.image = {
            image_id: 1,
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

                vm.region = vm.imageRegions[vm.regionIndex];
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
                // user_name: globalUser.displayName,
                // user_email: globalUser.email,
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
            loadProgress();
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
            var label = $('#m-region-role').text();
            vm.region['relations'][label] = parseInt(objectId);
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


        function getObjectKeys(object) {
            if (!object)
                return;
            return Object.keys(object);
        }

        function nextRole() {
            if (vm.roleIndex === getObjectKeys(vm.region.relations).length - 1) {
                vm.regionIndex++;
                vm.region = vm.imageRegions[vm.regionIndex];
                vm.region["relations"] = {};
                injectAnnotationToRegion(vm.region);
                vm.roleIndex = -1;
            }
            vm.roleIndex++;
            loadDefaultEntity();
        }

        function prevRole() {
            if (vm.roleIndex === 0)
                return;
            vm.roleIndex--;
            loadDefaultEntity();
        }

        function chooseRole(roleIndex) {
            vm.roleIndex = roleIndex;
            loadDefaultEntity();
        }

        function loadDefaultEntity() {
            $('.filter-option').html('&nbsp;');
            vm.chosenEntity = null;
            loadProgress();
        }

        function loadProgress() {
            var percent = (vm.regionIndex + 1) * 100 / vm.imageRegions.length;
            $('.progress .progress-bar').css('width', percent + '%');
        }

    }
})();