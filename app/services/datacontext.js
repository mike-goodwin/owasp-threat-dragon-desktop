'use strict';

function datacontext(datacontextdemo, datacontextfile) {

    var threatModelLocation = null;

    var service = {
        threatModelLocation: threatModelLocation,
        load: load,
        create: create,
        update: update
    };

    return service;

    function load(location, forceQuery) {
        return getContext(location).load(location, forceQuery);
    }

    function create(location, model) {
        return datacontextfile.save(model, service.threatModelLocation);
    }

    function update() {

        var result;

        //calling update with a null model attempts to copy the demo context model
        if (!datacontextfile.threatModel) {

            if (!datacontextdemo.threatModel) {
                result = $q.reject('Update called with no model or demo model');
            } else {
                result = datacontextfile.save(datacontextdemo.threatModel);
            }
            
        } else {
            result = datacontextfile.update();
        }

        return result;
    }

    function getContext(location) {

        var context;

        if (location === 'demo') {
            context = datacontextdemo;
        } else {
            context = datacontextfile;
        }

        return context;
    }
}

module.exports = datacontext;