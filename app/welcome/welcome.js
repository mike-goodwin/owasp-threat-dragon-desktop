'use strict';

function welcome($scope, $location, common, commonConfig) {

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
                $location.path('/threatmodel/' + fileNames[0]);
                $scope.$apply();
            }
        });
    }
}

module.exports = welcome;