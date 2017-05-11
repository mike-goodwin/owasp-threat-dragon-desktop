'use strict';

function welcome($scope, $location, $route, common, commonConfig, datacontext, electron, VERSION) {

    /*jshint validthis: true */
    var controllerId = 'welcome';
    var vm = this;
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);

    // Bindable properties and functions are placed on vm
    vm.title = 'Welcome';
    vm.version = VERSION;
    vm.openModel = openModel;

    activate();

    function activate() {
        common.activateController([], controllerId).then(function () { log('Activated Welcome View'); });
    }

    function openModel() {
        electron.dialog.open(function (fileNames) {
            datacontext.threatModelLocation = fileNames[0];
            if ($location.path() == '/threatmodel/file') {
                $route.reload();
            } else {
                $location.path('/threatmodel/file');
            }
            $scope.$apply();
        },
        function() {});
    }
}

module.exports = welcome;