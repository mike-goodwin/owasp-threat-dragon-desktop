'use strict';

function threatmodellocator() {

    var service = {
        getModelLocation: getModelLocation,
        getModelPath: getModelPath,
        getModelPathFromRouteParams: getModelPathFromRouteParams,
        willMoveModel: willMoveModel,
        newModelLocation: '/threatmodel/new'
    };

    return service;

    function getModelLocation(params) {
        var location = { file: decodeURI(params.file) };
        return location;
    }

    function getModelPath(params) {
        var path = encodeURI(params.file);
        return path;
    }

    function getModelPathFromRouteParams(params) {
        return params.file;
    }

    function willMoveModel(params, changes) {
        return false;
    }
}

module.exports = threatmodellocator;