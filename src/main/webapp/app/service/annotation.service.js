(function () {
    'use strict';
    angular
        .module('statnlpApp')
        .factory('AnnotationService', AnnotationService);

    AnnotationService.$inject = ['$rootScope', '$resource', 'DataService', 'DataUtils'];

    function AnnotationService($rootScope, $resource, DataService, DataUtils) {

        var endPoint = DataService.getEndpoint();
        var fileData = null;

        var resource = $resource('', {}, {
            'getAll': {
                method: 'GET',
                isArray: true,
                url: endPoint + '/data/annotations.json'
            },
        });

        var service = {
            getAll: resource.getAll,
            upload: upload,
            subscribe: subscribe,
            getFileData: getFileData
        };
        return service;

      
       
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

            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: success
            });

            function success(result) {
                result.data.pop();
                fileData = result.data;
                notify();
            }
        }

        function error(err) {
            console.log(error);
        }

        function getFileData() {
            return fileData;
        }
    }
})();