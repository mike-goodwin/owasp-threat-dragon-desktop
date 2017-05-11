'use strict';

var app = require('angular').module('app');
app.controller('welcome', ['$scope', '$location', '$route', 'common', 'commonConfig', 'datacontext', 'electron', 'VERSION', require('./welcome')]);