(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('DataService', DataService);

    DataService.$inject = ['$resource', '$localStorage'];

    function DataService($resource, $localStorage) {

        var endpointUrl = '';

        var service = {
            getEndpoint: getEndpoint,
            getDbEndpoint: getDbEndpoint,
            saveJson: saveJson,
            saveToStorage: saveToStorage,
            saveCsv: saveCsv
        };
        return service;

        function getEndpoint() {
            return endpointUrl;
        }

        function getDbEndpoint() {
            return 'localhost:3000';
        }

        function saveJson(data, filename) {

            if (!data) {
                console.error('No data');
                return;
            }

            if (!filename) {
                filename = 'annotation.json';
            }

            if (typeof data === 'object') {
                data = JSON.stringify(data, undefined, 2);
            }

            var blob = new Blob([data], {
                type: 'text/json'
            });

            // FOR IE:

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                var e = document.createEvent('MouseEvents'),
                    a = document.createElement('a');

                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initEvent('click', true, false, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            }
        }

        function saveToStorage(data) {
            $localStorage.regions = data;
        }

        function saveCsv() {
            var csv = Papa.unparse($localStorage.regions);
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:attachment/csv,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'regions.csv';
            hiddenElement.click();
        }


    }
})();