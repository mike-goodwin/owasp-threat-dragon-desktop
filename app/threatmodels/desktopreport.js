'use strict';

function desktopreport($q, $routeParams, $location, common, datacontext, threatmodellocator) {
    // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
    /*jshint validthis: true */
    var vm = this;
    var controllerId = 'desktopreport';
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);
    var logError = getLogFn(controllerId, 'error');

    // Bindable properties and functions are placed on vm.
    vm.title = 'Threat Model Report';
    vm.threatModel = {
        summary: {
            title: 'blah'
        }
    };
    vm.error = null;
    vm.loaded = false;
    vm.onLoaded = onLoaded;
    vm.onError = onError;

    activate();

    function activate() {
        common.activateController([getThreatModel()], controllerId)
            .then(function () { log('Activated Desktop Report Controller'); });
    }

    function getThreatModel(forceReload) {

        var location = threatModelLocation();

        return datacontext.load(location, forceReload).then(onLoad, onError);

        function onLoad(data) {
            vm.threatModel = data;
            return vm.threatModel;
        }
    }

    function onLoaded() {
        vm.loaded = true;
        return 'called onLoaded';
    }

    function onError(err) {
        vm.error = err;
        logError(err.data.message);
    }

    function threatModelLocation() {
        return threatmodellocator.getModelLocation($routeParams);
    }
}

module.exports = desktopreport;