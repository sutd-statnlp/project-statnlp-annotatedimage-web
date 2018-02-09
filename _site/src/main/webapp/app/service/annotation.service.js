(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('AnnotationService', AnnotationService);

    AnnotationService.$inject = ['$resource','DataService'];

    function AnnotationService($resource,DataService) {

        var endPoint = DataService.getEndpoint();
        return $resource('', {}, {
            'getAll': { method: 'GET', isArray:true , url: endPoint + '/data/annotations.json' },
        });

    }
})();
