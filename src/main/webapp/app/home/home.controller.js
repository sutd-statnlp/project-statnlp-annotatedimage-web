(function () {
    'use strict';

    angular
        .module('statnlpApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', '$ocLazyLoad', 'ImageService', 'DataService', 'CsvService'];

    function HomeController($scope, $state, $ocLazyLoad, ImageService, DataService, CsvService) {

        var vm = this;
        var images = [];

        vm.batchRange = [];
        vm.getObjectKeys = getObjectKeys;
        vm.nextRole = nextRole;
        vm.prevRole = prevRole;
        vm.chooseRole = chooseRole;
        vm.roleIndex = 0;
        vm.imageRegions = [];
        vm.regionIndex = 0;
        vm.suggestions = [];
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

        loadBatchRange();

        function loadImages() {
            ImageService.getAll({}, onSuccess, onError);

            function onSuccess(data) {
                images = data;
                vm.image = images[0];
                loadRegionsFromCsv(vm.image);
            }
        }

        function loadBatchRange() {
            for (var i = 0; i < CsvService.batchNumber; i++) {
                vm.batchRange.push(i);
            }
        }


        function loadRegionsFromCsv(image) {
            CsvService.getRegionsFromCsv(image.image_id).success(function (data) {
                Papa.parse(data, {
                    header: true,
                    dynamicTyping: true,
                    complete: success
                });

                function success(result) {
                    result.data.pop();
                    vm.imageRegions = result.data;
                    vm.region = vm.imageRegions[vm.regionIndex];
                    $ocLazyLoad.load('js/pages/medias/image-gallery.js');

                    loadRegionSample(vm.region);
                    loadSelectedRole();
                    loadProgress();
                }
            });
        }

        function loadSelectedRole() {
            vm.suggestions = vm.region['suggestion' + vm.roleIndex].split(',');
            loadSelectObjects(vm.suggestions);

            var coordinates = angular.fromJson('[' + vm.region.coordinates.replace(/'/g, '"') + ']');
            initCanvas(coordinates);
        }

        function loadSelectObjects(suggestions) {
            for (var i = 0; i < suggestions.length; i++) {
                $('.dropdown-menu.inner').append('<li data-original-index="' + (i + 2) + '"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">' + getObjectNameById(suggestions[i]) + '</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li>');
            }
        }

        function loadRegionSample(region) {
            var mapping = angular.fromJson(region.example_mapping.replace(/'/g, '"'));
            region['format'] = {
                subject1: mapping[0],
                verb: region.roles_example.split('<rel>')[1].split('</rel>')[0],
                subject2: mapping[1]
            };

            var sampleSub1 = region.roles_example.split('<arg n="0">')[1].split('</arg>')[0];
            var sampleSub2 = region.roles_example.split('<arg n="1">')[1].split('</arg>')[0];
            var sampleText = region.roles_example.split('<text>')[1].split('</text>')[0].replace(/\s\s+/g, ' ');
            var regionHtml = sampleText.replace(sampleSub1, '<b class="col-blue">' + sampleSub1 + '</b>');
            regionHtml = regionHtml.replace(region.format.verb, '<b class="col-green">' + region.format.verb + '</b>');
            regionHtml = regionHtml.replace(sampleSub2, '<b class="col-orange">' + sampleSub2 + '</b>');
            
            $('#region-sample').html(regionHtml);
        }

        function getObjectNameById(id) {
            for (var i = 0; i < vm.image.objects.length; i++) {
                var item = vm.image.objects[i];
                if (item.object_id == id)
                    return item.names[0];
            }
            return null;
        }

        function onError(error) {
            console.log(error);
        }

        function chooseObject(objectId) {
            vm.region['value' + vm.roleIndex] = parseInt(objectId);
        }

        function getObjectKeys(object) {
            if (!object)
                return;
            return Object.keys(object);
        }

        function nextRole() {
            if (vm.regionIndex === vm.imageRegions.length) {
                return;
            }
            if (vm.roleIndex === CsvService.batchNumber - 1) {
                vm.regionIndex++;
                vm.region = vm.imageRegions[vm.regionIndex];
                loadRegionSample(vm.region);
                vm.roleIndex = -1;
            }
            vm.roleIndex++;
            loadRoleEntity();
        }

        function prevRole() {
            if (vm.roleIndex === 0)
                return;
            vm.roleIndex--;
            loadRoleEntity();
        }

        function chooseRole(roleIndex) {
            vm.roleIndex = roleIndex;
            loadRoleEntity();
        }

        function loadRoleEntity() {
            $('.filter-option').html('&nbsp;');
            vm.chosenEntity = null;
            loadProgress();
            loadSelectedRole();
        }

        function loadProgress() {
            var percent = (vm.regionIndex + 1) * 100 / vm.imageRegions.length;
            $('.progress .progress-bar').css('width', percent + '%');
            draw(0, 0, 0, 0, true);
        }


        var canvas = document.getElementById('m-canvas');
        var context = canvas.getContext('2d');
        var imageObj = new Image();

        function initCanvas(coordinates) {
            $('.dropdown-menu .inner li').unbind('mouseenter mouseleave');
            $('.dropdown-menu .inner li').hover(function () {
                var index = $(this).attr('data-original-index');
                if (index >= 2) {
                    drawByCoordinateIndex(coordinates,index);
                }
            });
            context.clearRect(0, 0, 400, 300);
        }

        function drawByCoordinateIndex(coordinates, index) {
            var object = coordinates[index - 2];
            var x = object.x / 2;
            var y = object.y / 2;
            var w = object.w / 2;
            var h = object.h / 2;
            draw(x, y, w, h);
        }

        function draw(x, y, w, h, isImageChanged) {
            if (isImageChanged) {
                imageObj.onload = function () {
                    context.drawImage(imageObj, 0, 0, 400, 300);
                };
                imageObj.src = './data/images/region/' + vm.image.image_id + '/' + vm.region.region_id + '.png';
            }

            context.clearRect(0, 0, 400, 300);
            context.drawImage(imageObj, 0, 0, 400, 300);
            context.strokeStyle = 'blue';
            context.strokeRect(x, y, w, h);
        }

    }
})();