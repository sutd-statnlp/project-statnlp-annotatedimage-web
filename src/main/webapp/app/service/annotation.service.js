(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('AnnotationService', AnnotationService);

    AnnotationService.$inject = ['$rootScope', '$resource', 'DataService'];

    function AnnotationService($rootScope, $resource, DataService) {

        var endPoint = DataService.getEndpoint();
        var userAnnotation = null;

        var resource = $resource('', {}, {
            'getAll': {
                method: 'GET',
                isArray: true,
                url: endPoint + '/data/annotations.json'
            },
        });

        var service = {
            getAll: resource.getAll,
            save: save,
            upload: upload,
            subscribe: subscribe,
            getUserNotification: getUserNotification
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
        }

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify() {
            $rootScope.$emit('notifying-service-event');
        }

        function upload(file) {
            if (!file)
                return;
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                userAnnotation = angular.fromJson(evt.target.result);
                notify();
            };
        }

        function getUserNotification() {
            return userAnnotation;
        }
    }
})();