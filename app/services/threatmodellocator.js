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

    //gets a file path from a uri encoded value
    //repeatedely decode until it looks like an unencoded value
    function getModelLocation(params) {

        var result = params.location;

        while (checkEncoded(result)) {
            result = decodeURI(result);
        }

        return result;
    }

    //gets a url path from a file path
    //encode it unless it already looks encoded
    function getModelPath(location) {

        var result = location;

        if (!checkEncoded(result)) {
            result = encodeURI(result);
        }

        return result;
    }

    //get a url path from a route params object
    //encode it unless it already looks encoded
    function getModelPathFromRouteParams(params) {
        var result = params.location;

        if (!checkEncoded(result)) {
            result = encodeURI(result);
        }

        return result;
    }

    function willMoveModel() {
        return false;
    }

    function checkEncoded(value) {
        return /\%/i.test(value);
    }
}

module.exports = threatmodellocator;