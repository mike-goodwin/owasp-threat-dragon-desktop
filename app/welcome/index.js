'use strict';

var app = require('angular').module('app');
app.controller('welcome', ['$scope', '$location', 'common', 'commonConfig', require('./welcome')]);