'use strict';

var _ = require('lodash');
const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const fs = require('fs');
const path = require('path');
const userDataPath = electron.remote.app.getPath('userData');

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
        autoUpdater: remote.autoUpdater,
        userData: {
            get: getUserData,
            set: setUserData
        }
    };

    return service;

    function save(onSave, onNoSave) {
        dialog.showSaveDialog(remote.getCurrentWindow(), { filters: [{ name: 'Threat Models', extensions: ['json'] }] }, function (fileName) {
            if (_.isUndefined(fileName)) {
                onNoSave();
            } else {
                onSave(fileName);
            }
        });
    }

    function open(onOpen, onNoOpen) {
        dialog.showOpenDialog(remote.getCurrentWindow(), { filters: [{ name: 'Threat Models', extensions: ['json'] }] }, function (fileNames) {
            if (!_.isUndefined(fileNames)) {
                onOpen(fileNames);
            } else {
                onNoOpen();
            }
        });
    }

    function getUserData(location) {
        const data = parseDataFile(location.configName, null);
        return data[location.key];
    }

    function setUserData(location, value) {
        var configName = location.configName;
        var data = parseDataFile(configName, {});
        data[location.key] = value;
        console.log(getFilePath(configName));
        fs.writeFileSync(getFilePath(configName), JSON.stringify(data));
    }

    //private methods

    function parseDataFile(configName, defaults) {

        var filePath = getFilePath(configName);

        try {
            return JSON.parse(fs.readFileSync(filePath));
        } catch (error) {
            // if there was some kind of error, return the passed in defaults instead.
            return defaults;
        }
    }

    function getFilePath(configName) {
        return path.join(userDataPath, configName + '.json'); 
    }
}

module.exports = electronservice;
