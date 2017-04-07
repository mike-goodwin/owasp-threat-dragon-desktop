var angular = require('angular');
var app = angular.module('app');
app.factory('datacontextdemo', ['$q', '$http', require('./datacontextdemo')]);
app.factory('datacontext', ['$q', 'datacontextdemo', require('./datacontext')]);
app.factory('threatmodellocator', [require('./threatmodellocator')]);
