'use strict';

var angular = require('angular');
require('angular-ui-bootstrap');
require('angular-route');
require('angular-xeditable');
require('angular-animate');
window.jQuery = require('jquery');
require('owasp-threat-dragon-core');

//temporary fix for Chrome/Jointjs problem
SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function (toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'xeditable', 'ngAnimate', 'templates', 'common', 'owasp-threat-dragon-core']);

//version
app.constant('VERSION', require('./package.json').version);

//require custom modules, services, controllers and directives
require('./app/config.route');
require('./app/layout');
require('./app/welcome');
require('./app/services');
require('./app/threatmodels');

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.run(['$q',
    function ($q) {
        require('any-promise/register')('$q', { Promise: $q });
    }]);

app.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.location = $location;
    }]);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// Handle routing errors and success events
app.run(['$route', '$rootScope', 'routemediator',
    function ($route, $rootScope, routemediator) {
        routemediator.setRoutingHandlers();
    }]);

//config for angular-xeditable
app.run(['editableOptions', function (editableOptions) {
    editableOptions.theme = 'bs3';
}]);

//electron autoupdate
app.run(['common', 'dialogs', 'VERSION', require('./app/config.autoupdate')]);
