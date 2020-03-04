'use strict';

function welcome($scope, $location, $route, common, electron, threatmodellocator) {

    /*jshint validthis: true */
    var fsp = require('fs');
    var controllerId = 'welcome';
    var vm = this;
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);

    // Bindable properties and functions are placed on vm
    vm.title = 'Welcome';
    vm.openModel = openModel;
    vm.openNewModel = openNewModel;

    activate();

    function activate() {
        common.activateController([], controllerId).then(function () { log('Activated Welcome View'); });
    }

    function openModel() {
        electron.dialog.open(function (fileNames) {
            var path = threatmodellocator.getModelPath( fileNames[0]);
            if ($location.path() == '/threatmodel/' + path) {
                $route.reload();
            } else {
                $location.path('/threatmodel/' + path);
            }
            $scope.$apply();
        },
        function() {});
    }

    function openNewModel() {
        var model = { summary: { title: "New Threat Model" }, detail: { contributors: [], diagrams: [] } };
        electron.dialog.save(function (fileName) {
            fsp.writeFileSync( fileName, JSON.stringify(model) );
            var path = threatmodellocator.getModelPath( fileName );
            if ($location.path() == '/threatmodel/' + path) {
                $route.reload();
            } else {
                $location.path('/threatmodel/' + path);
            }
            $scope.$apply();
        },
        function() {});
    }
}

module.exports = welcome;
