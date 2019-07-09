'use strict';

var app = require('angular').module('app');
app.controller('shell', ['$rootScope', '$scope', '$location', '$route', 'common', 'config', 'datacontext', 'electron', 'dialogs', 'VERSION', require('./shell')]);