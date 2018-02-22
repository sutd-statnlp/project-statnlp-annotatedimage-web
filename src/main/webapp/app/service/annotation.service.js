(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('AnnotationService', AnnotationService);

    AnnotationService.$inject = ['$resource', 'DataService'];

    function AnnotationService($resource, DataService) {

        var endPoint = DataService.getEndpoint();
        var resource = $resource('', {}, {
            'getAll': {
                method: 'GET', 
                isArray: true,
                url: endPoint + '/data/annotations.json'
            },
        });

        var service = {
            getAll: resource.getAll,
            save: save
        };
        return service;

        function save(annotation) {
            saveJson(annotation);
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
        };
    }
})();