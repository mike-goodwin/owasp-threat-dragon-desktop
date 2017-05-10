'use strict';

var _ = require('lodash');
const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;

function electronservice() {

    var service = {
        dialog: {
            save: save,
            open: open
        },
        currentWindow: remote.getCurrentWindow(),
        shell: electron.shell,
        Menu: remote.Menu,
        app: remote.app,
        autoUpdater: remote.autoUpdater
    };

    return service;

    function save(onSave, onNoSave) {
        dialog.showSaveDialog(remote.getCurrentWindow(), {filters: [{name: 'Threat Models', extensions: ['json']}]}, function (fileName) {
            if (_.isUndefined(fileName)) {
                onNoSave();
            } else {
                onSave(fileName);
            }
        });
    }

    function open(onOpen, onNoOpen) {
        dialog.showOpenDialog(remote.getCurrentWindow(), {filters: [{name: 'Threat Models', extensions: ['json']}]}, function (fileNames) {
            if (!_.isUndefined(fileNames)) {
                onOpen(fileNames);
            } else {
                onNoOpen();
            }
        });
    }
}

module.exports = electronservice;