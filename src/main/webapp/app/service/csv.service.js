(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('CsvService', CsvService);

    CsvService.$inject = ['$http', 'DataService'];

    function CsvService($http, DataService) {

        var batchNumber = 8;

        var service = {
            getRegionsFromCsv: getRegionsFromCsv,
            batchNumber: batchNumber
        };

        function getEndPoint(imageId) {
            return '/data/csv/' + imageId + '/batch_' + batchNumber + '.csv';
        }

        function getRegionsFromCsv(imageId) {
            var endPoint = getEndPoint(imageId);
            return $http.get(endPoint);
        }


        return service;
    }
})();