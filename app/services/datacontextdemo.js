'use strict';

var _ = require('lodash');

function datacontextdemo($q, $http) {

    var threatModel = null;
    var threatModelUri = 'https://raw.githubusercontent.com/mike-goodwin/owasp-threat-dragon-demo/master/ThreatDragonModels/Demo%20Threat%20Model/Demo%20Threat%20Model.json';

    var service = {
        load: load,
        threatModel: threatModel
    };

    return service;

    function load(location, forceQuery) {

        if (service.threatModel && !forceQuery) {
            return $q.when(service.threatModel);
        }

        var config = {
            headers: { Accept: 'application/json' }
        };

        return $http.get(threatModelUri, config).then(onLoadedThreatModel, onLoadError);

        function onLoadedThreatModel(result) {
            service.threatModel = result.data;
            return $q.resolve(service.threatModel);
        }

        function onLoadError(err) {
            service.threatModel = null;
            return $q.reject(err);
        }
    }
}

module.exports = datacontextdemo;