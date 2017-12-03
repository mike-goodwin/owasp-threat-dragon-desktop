'use strict';

function datacontext($q, datacontextdemo, electron) {

    var fsp = require('fs-promise');
    var threatModelLocation = null;
    var threatModel = null;

    var service = {
        load: load,
        create: create,
        update: update,
        saveThreatModelDiagram: saveThreatModelDiagram,
        deleteModel: deleteModel,
        close: close,
        saveAs: saveAs,
        threatModelLocation: threatModelLocation,
        threatModel: threatModel
    };

    return service;

    function load(params, forceQuery) {
        var result;

        if (params.location === 'demo') {
            result = datacontextdemo.load(forceQuery);
        } else {
            result = loadFromFile(forceQuery);
        }

        return result.then(onLoaded, onLoadError);

        function onLoaded(model) {
            service.threatModel = model;
            setLocation(service.threatModelLocation);

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

    function deleteModel() {

        if (service.threatModelLocation) {
            return fsp.unlink(service.threatModelLocation).then(onDeleted);
        } else {
            return $q.reject('No file specified');
        }

        function onDeleted() {

            service.threatModel = null;
            service.threatModelLocation = null;
            return $q.resolve(null);
        }
    }

    function close() {
        service.threatModel = null;
        service.threatModelLocation = null;
    }

    function saveAs() {
        service.threatModelLocation = null;
        return save(service.threatModel);
    }

    function save(model) {
        var deferred = $q.defer();

        if (service.threatModelLocation && service.threatModelLocation != 'demo') {
            doSave();
        } else {
            electron.dialog.save(function (fileName) {
                service.threatModelLocation = fileName;
                doSave();
            },
                onCancel()
            );
        }

        return deferred.promise;

        function onCancel() {
            service.threatModelLocation = service.loadedLocation;
            deferred.resolve({ model: service.threatModel, location: { file: service.threatModelLocation } });
        }

        function doSave() {
            fsp.writeJson(service.threatModelLocation, model).then(onSavedThreatModel, onSaveError);
        }

        function onSavedThreatModel() {
            setLocation(service.threatModelLocation);
            deferred.resolve({ model: service.threatModel, location: { file: service.threatModelLocation } });
        }

        function onSaveError(err) {
            service.threatModelLocation = service.loadedLocation;
            deferred.reject(err);
        }
    }

    function loadFromFile(forceQuery) {
        if (service.threatModel && !forceQuery && service.threatModelLocation === service.loadedLocation) {
            return $q.when(service.threatModel);
        }

        var deferred = $q.defer();
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

    function setLocation(location) {
        service.loadFromFile = location;
        electron.currentWindow.setTitle('OWASP Threat Dragon (' + location + ')');
    }
}

module.exports = datacontext;