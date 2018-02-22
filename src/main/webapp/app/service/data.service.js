(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('DataService', DataService);

    DataService.$inject = ['$resource'];

    function DataService($resource) {

        var endpointUrl = '';

        var service = {
            getEndpoint: getEndpoint,
            getDbEndpoint: getDbEndpoint
        };
        return service;

        function getEndpoint() {
            return endpointUrl;
        }

        function getDbEndpoint() {
            return 'localhost:3000';
        }
    }
})();
