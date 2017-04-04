'use strict';

function threatmodellocator() {

    var service = {
        getModelLocation: getModelLocation,
        getModelPath: getModelPath,
        willMoveModel: willMoveModel,
        newModelLocation: '/threatmodel/new'
    };

    return service;

    function getModelLocation(params) {
        var location = decodeURI(params.file);
        return location;
    }

    function getModelPath(params) {
        var path = encodeURI(params.file);
        return path;
    }

    function willMoveModel(params, changes) {
        return false;
    }
}

module.exports = threatmodellocator;