'use strict';

function datacontextfile($q) {

    var _ = require('lodash');
    var fsp = require('fs-promise');
    var threatModel = null;
    var filePath = null;

    var service = {
        load: load,
        save: save,
        saveThreatModelDiagram: saveThreatModelDiagram,
        threatModel: threatModel,
        filePath: filePath
    };

    return service;

    function load(location, forceQuery) {

        if (service.threatModel && !forceQuery && service.filePath === location) {
            return $q.when(service.threatModel);
        }

        var deferred = $q.defer();
        service.filePath = location;
        fsp.readFile(service.filePath, 'utf8').then(onLoadedThreatModel, onLoadError);

        return deferred.promise;

        function onLoadedThreatModel(result) {
            service.threatModel = JSON.parse(result);
            deferred.resolve(service.threatModel);
        }

        function onLoadError(err) {
            service.threatModel = null;
            service.filePath = null;
            deferred.reject(err);
        }
    }

    function save(model) {

        var deferred = $q.defer();

        if (service.filePath) {
            doSave(service.filePath);
        } else {
            dialog.showSaveDialog(function (fileName) {
                if (_.isUndefined(fileName)) {
                    onSaveError('No file selected');
                } else {
                    service.filePath = filename;
                    doSave(fileName);
                }
            });
        }

        return deferred.promise;

        function doSave(fileName) {
            fsp.writeJson(fileName, model).then(onSavedThreatModel, onSaveError);
        }

        function onSavedThreatModel() {
            service.threatModel = model;
            deferred.resolve(service.threatModel);
        }

        function onSaveError(err) {
            service.filePath = null;
            deferred.reject(err);
        }
    }

    function saveThreatModelDiagram() {
        return save();
    }
}

module.exports = datacontextfile;