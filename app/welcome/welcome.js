'use strict';

function welcome($scope, $location, $route, common, electron, threatmodellocator) {

    /*jshint validthis: true */
    var controllerId = 'welcome';
    var vm = this;
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);

    // Bindable properties and functions are placed on vm
    vm.title = 'Welcome';
    vm.openModel = openModel;

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
}

module.exports = welcome;