'use strict';

var app = require('angular').module('app');
app.controller('shell', ['$rootScope', '$scope', '$location', '$route', 'common', 'config', 'datacontext', require('./shell')]);