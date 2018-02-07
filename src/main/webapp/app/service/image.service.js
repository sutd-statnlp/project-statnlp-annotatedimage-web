(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('ImageService', ImageService);

    ImageService.$inject = ['$resource','DataService'];

    function ImageService($resource,DataService) {

        var endPoint = DataService.getEndpoint();
        return $resource('', {}, {
            'getAll': { method: 'GET', isArray:true , url: endPoint + '/data/images.json' },
        });

    }
})();
