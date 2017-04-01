'use strict';

function datacontextfile($q) {

    var electron = require('electron');
    var remote = electron.remote;
    var dialog = remote.dialog;
    var _ = require('lodash');
    var threatModel = null;
    var fsp = require('fs-promise');

    var service = {
        load: load,
        threatModel: threatModel
    };

    return service;

    function load(forceQuery) {

        if (service.threatModel && !forceQuery) {
            return $q.when(service.threatModel);
        }

        var deferred = $q.defer();

        dialog.showOpenDialog(function (fileNames) {
            if (_.isUndefined(fileNames)) {
                onLoadError('No file selected')
            } else {
                fsp.readFile(fileNames[0], 'utf8').then(onLoadedThreatModel, onLoadError);
            }
        });

        return deferred.promise;

        function onLoadedThreatModel(result) {
            service.threatModel = JSON.parse(result);
            deferred.resolve(service.threatModel);
        }

        function onLoadError(err) {
            service.threatModel = null;
            deferred.reject(err);
        }
    }
}

module.exports = datacontextfile;