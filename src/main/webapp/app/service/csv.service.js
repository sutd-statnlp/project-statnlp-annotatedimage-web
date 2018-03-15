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

        function getEndPoint() {
            return '/data/csv/batch_' + batchNumber + '.csv';
        }

        function getRegionsFromCsv() {
            var endPoint = getEndPoint();
            return $http.get(endPoint);
        }


        return service;
    }
})();