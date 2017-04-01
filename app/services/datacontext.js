'use strict';

function datacontext(datacontextdemo, datacontextfile) {

    var service = {
        load: load
    };

    return service;

    function load(location, forceQuery) {

        var context;

        if (location.action === 'demo')
        {
            context = datacontextdemo;
        } else {
            context = datacontextfile;
        }

        return context.load(forceQuery)
    }
}

module.exports = datacontext;