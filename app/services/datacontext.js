'use strict';

function datacontext(datacontextdemo) {

    var threatModel = null;

    var service = {
        load: load,
        threatModel: threatModel
    };

    return service;

    function load(location, forceQuery) {
        return datacontextdemo.load(location, forceQuery)
    }
}

module.exports = datacontext;