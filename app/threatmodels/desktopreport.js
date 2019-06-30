'use strict';

function desktopreport($q, $routeParams, $location, common, datacontext, threatmodellocator, electron) {
    var fsp = require('promise-fs');
    /*jshint validthis: true */
    var vm = this;
    var controllerId = 'desktopreport';
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);
    var logError = getLogFn(controllerId, 'error');

    // Bindable properties and functions are placed on vm.
    vm.title = 'Threat Model Report';
    vm.threatModel = {};
    vm.error = null;
    vm.loaded = false;
    vm.onLoaded = onLoaded;
    vm.onError = onError;
    vm.savePDF = savePDF;
    vm.printPDF = printPDF;

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

    function savePDF(done) {
        electron.currentWindow.webContents.printToPDF(pdfSettings, onPrinted);

        function pdfSettings() {

            var option = {
                landscape: false,
                marginsType: 0,
                printBackground: false,
                printSelectionOnly: false,
                pageSize: 'A4',
            };

            return option;
        }

        function onPrinted(error, data) {
            if (error) {
                done();
                onError(error);
            } else {

                var defaultPath = null;
                if (datacontext.threatModelLocation) {
                    defaultPath = datacontext.threatModelLocation.replace('.json', '.pdf');
                }

                electron.dialog.savePDF(defaultPath, function (fileName) {
                    fsp.writeFile(fileName, data).then(function() { 
                        done();
                    });
                },
                function() {
                    log('Cancelled save threat model');
                    done();
                });
            }
        }
    }
    
    function printPDF(done) {

        //use default print options
        var printSettings = {};

        electron.currentWindow.webContents.print(printSettings, onPrinted);
        
        function onPrinted(success) {
            if (success) {
                log('Report printed successfully');
                done();
            } else {
                // see Electron issue https://github.com/electron/electron/issues/19008
                // application will "hang" if the print dialog is cancelled
                // calling reload instead of done is a temporary workaround
                logError('Report printing failed');
                electron.currentWindow.webContents.reload();
            }
        }
    }
}

module.exports = desktopreport;