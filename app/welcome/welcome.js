'use strict';

function welcome($scope, $location, $route, common, commonConfig, datacontext) {

    var _ = require('lodash');
    const electron = require('electron');
    const remote = electron.remote;
    const dialog = remote.dialog;

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
        dialog.showOpenDialog(function (fileNames) {
            if (!_.isUndefined(fileNames)) {
                datacontext.threatModelLocation = fileNames[0];

                if ($location.path() == '/threatmodel/file') {
                    $route.reload();
                } else {
                    $location.path('/threatmodel/file');
                }
                $scope.$apply();
            }
        });
    }
}

module.exports = welcome;