(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('RegionService', RegionService);

    RegionService.$inject = ['$resource','DataService'];

    function RegionService($resource,DataService) {

        var endPoint = DataService.getEndpoint();
        return $resource('', {}, {
            'getAll': { method: 'GET', isArray:true , url: endPoint + '/data/regions.json' },
        });

    }
})();
