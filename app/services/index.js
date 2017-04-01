var angular = require('angular');
var app = angular.module('app');
app.factory('datacontextdemo', ['$q', '$http', require('./datacontextdemo')]);
app.factory('datacontextfile', ['$q', require('./datacontextfile')]);
app.factory('datacontext', ['datacontextdemo', 'datacontextfile', require('./datacontext')]);
app.factory('threatmodellocator', [require('./threatmodellocator')]);
