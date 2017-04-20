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
        return params;
    }

    function getModelPath(params) {
        return params.location;
    }

    function getModelPathFromRouteParams(params) {
        return params.location;
    }

    function willMoveModel() {
        return false;
    }
}

module.exports = threatmodellocator;