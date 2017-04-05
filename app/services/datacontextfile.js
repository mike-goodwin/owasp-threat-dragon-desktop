'use strict';

function datacontextfile($q) {

    var _ = require('lodash');
    var fsp = require('fs-promise');
    const electron = require('electron');
    const remote = electron.remote;
    const dialog = remote.dialog;
    var threatModel = null;
    var filePath = null;

    var service = {
        load: load,
        save: save,
        update: update,
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
                    service.filePath = fileName;
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
            deferred.resolve({model: service.threatModel, location: { file: service.filePath}});
        }

        function onSaveError(err) {
            service.filePath = null;
            deferred.reject(err);
        }
    }

    function update() {
        return save(service.threatModel);
    }

    function saveThreatModelDiagram() {
        return save();
    }
}

module.exports = datacontextfile;