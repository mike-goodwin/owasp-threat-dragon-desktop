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

        service.threatModelLocation = location;
        return getContext(location).load(forceQuery);
    }

    function create(location, model) {
        return datacontextfile.save(model);
    }

    function getContext(location) {

        var context;

        if (location.action === 'demo')
        {
            context = datacontextdemo;
        } else {
            context = datacontextfile;
        }

        return context;
    }
}

module.exports = datacontext;