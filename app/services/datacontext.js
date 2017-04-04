'use strict';

function datacontext(datacontextdemo, datacontextfile) {

    var threatModelLocation = null;

    var service = {
        threatModelLocation: threatModelLocation,
        load: load,
        create: create
    };

    return service;

    function load(location, forceQuery) {
        return getContext(location).load(location, forceQuery);
    }

    function create(location, model) {
        return datacontextfile.save(model, service.threatModelLocation);
    }

    function getContext(location) {

        var context;

        if (location === 'demo')
        {
            context = datacontextdemo;
        } else {
            context = datacontextfile;
        }

        return context;
    }
}

module.exports = datacontext;