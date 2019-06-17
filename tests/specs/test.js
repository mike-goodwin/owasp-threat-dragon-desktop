var angular = require('angular');
require('angular-mocks');
var app= angular.module('app', []);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.factory('datacontextdemo', ['$q', '$http', require('../../app/services/datacontextdemo')]);
app.factory('datacontext', ['$q', 'datacontextdemo', 'electron', require('../../app/services/datacontext')]);
app.factory('threatmodellocator', [require('../../app/services/threatmodellocator')]);