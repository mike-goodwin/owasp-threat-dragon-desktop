var angular = require('angular');
require('angular-mocks');
var app= angular.module('app', []);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
require('../../app/services/index');