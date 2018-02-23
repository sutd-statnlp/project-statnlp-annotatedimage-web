(function() {
    'use strict';

    angular
        .module('statnlpApp', [
            'ngResource',
            'ngAria',
            'ui.router',
            'oc.lazyLoad',
            'ngFileUpload'
        ])
        .run(run);

    run.$inject = ['stateHandler'];

    function run(stateHandler) {
        stateHandler.initialize();
    }
})();
