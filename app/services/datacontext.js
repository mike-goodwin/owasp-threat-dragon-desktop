'use strict';

function datacontext($q, datacontextdemo) {

    var _ = require('lodash');
    var fsp = require('fs-promise');
    const electron = require('electron');
    const remote = electron.remote;
    const dialog = remote.dialog;
    var threatModelLocation = null;
    var threatModel = null;

    var service = {
        load: load,
        create: create,
        update: update,
        saveThreatModelDiagram: saveThreatModelDiagram,
        threatModelLocation: threatModelLocation,
        threatModel: threatModel
    };

    return service;

    function load(location, forceQuery) {

        var result;

        if (location === 'demo') {
            result = datacontextdemo.load(forceQuery);
        } else {
            result = loadFromFile(location, forceQuery);
        }

        return result.then(onLoaded, onLoadError);

        function onLoaded(model) {

            service.threatModel = model;

            //don't set the location for demo model so subsequent save will show a save dialog
            if (!location === 'demo') {
                service.threatModelLocation = location;
            }
            return $q.resolve(service.threatModel);
        }

        function onLoadError(error) {

            service.threatModel = null;
            service.threatModelLocation = null;
            return $q.reject(error);
        }
    }

    function create(location, model) {

        service.threatModelLocation = null;
        return save(model);
    }

    function update() {

        return save(service.threatModel);
    }

    function saveThreatModelDiagram(diagramId, diagramData) {

        var diagramToSave = service.threatModel.detail.diagrams.find(function (diagram) {
            return diagram.id == diagramId;
        });

        if (diagramToSave) {
            diagramToSave.diagramJson = diagramData.diagramJson;
            diagramToSave.size = diagramData.size;
            return update();
        } else {
            return $q.reject(new Error('invalid diagram id'));
        }
    }

    function save(model) {

        var deferred = $q.defer();

        if (service.threatModelLocation) {
            doSave(service.threatModelLocation);
        } else {
            dialog.showSaveDialog(function (fileName) {
                if (_.isUndefined(fileName)) {
                    onSaveError('No file selected');
                } else {
                    service.threatModelLocation = fileName;
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
            deferred.resolve({ model: service.threatModel, location: { file: service.threatModelLocation } });
        }

        function onSaveError(err) {
            service.threatModelLocation = null;
            deferred.reject(err);
        }
    }

    function loadFromFile(location, forceQuery) {

        if (service.threatModel && !forceQuery && service.threatModelLocation === location) {
            return $q.when(service.threatModel);
        }

        var deferred = $q.defer();
        service.threatModelLocation = location;
        fsp.readFile(service.threatModelLocation, 'utf8').then(onLoadedThreatModel, onLoadError);

        return deferred.promise;

        function onLoadedThreatModel(result) {
            var model = JSON.parse(result);
            deferred.resolve(model);
        }

        function onLoadError(err) {
            deferred.reject(err);
        }
    }
}

module.exports = datacontext;