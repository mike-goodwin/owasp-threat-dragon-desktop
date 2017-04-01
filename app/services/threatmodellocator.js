'use strict';

function threatmodellocator() {

    var service = {
        getModelLocation: getModelLocation,
        getModelPath: getModelPath,
        newModelLocation: '/new'
    };

    return service;

    function getModelLocation(params) {

        var location = {
            action: params.action
        };

        return location;
    }

    function getModelPath(params) {
        return params.action;
    }
}

module.exports = threatmodellocator;