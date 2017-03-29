'use strict';

function test(common) {

    /*jshint validthis: true */
    var controllerId = 'welcome';
    var vm = this;
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);

    // Bindable properties and functions are placed on vm
    vm.title = 'Test';

    activate();

    function activate() {
        common.activateController([], controllerId).then(function () { log('Activated Test View'); });
    }
}

module.exports = test;