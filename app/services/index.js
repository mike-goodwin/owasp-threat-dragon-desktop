var angular = require('angular');
var app = angular.module('app');
app.factory('datacontextdemo', ['$q', '$http', require('./datacontextdemo')]);
