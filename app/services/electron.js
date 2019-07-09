'use strict';

var _ = require('lodash');
const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const fs = require('fs');
const path = require('path');
const userDataPath = electron.remote.app.getPath('userData');

function electronservice(common) {
    var logInfo = common.logger.getLogFn('electron service', 'info');
    var logError = common.logger.getLogFn('electron service', 'error');

    var service = {
        dialog: {
            save: save,
            savePDF: savePDF,
            open: open,
            messageBox: messageBox
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

    var defaultPreferences = {
        updateOnLaunch: true
    };

    return service;

    function messageBox(options) {
        dialog.showMessageBox(remote.getCurrentWindow(), options);
    }

    function save(onSave, onNoSave) {
        dialog.showSaveDialog(remote.getCurrentWindow(), { filters: [{ name: 'Threat Models', extensions: ['json'] }] }, function (fileName) {
            if (_.isUndefined(fileName)) {
                onNoSave();
            } else {
                onSave(fileName);
            }
        });
    }

    function savePDF(defaultPath, onSave, onNoSave) {
        dialog.showSaveDialog(remote.getCurrentWindow(), { defaultPath: defaultPath, filters: [{name: 'PDF files', extensions: ['pdf'] }] }, function (fileName) {
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
        const data = parseDataFile(location.configName, defaultPreferences);
        logInfo('got ' + data);
        return data[location.key];
    }

    function setUserData(location, value) {
        var configName = location.configName;
        var data = parseDataFile(configName, defaultPreferences);
        data[location.key] = value;
        try {
            logInfo('writing: ' + JSON.stringify(data));
            fs.writeFileSync(getFilePath(configName), JSON.stringify(data), 'utf8');
            logInfo('wrote: ' + JSON.stringify(data));
        }
        catch (error) {
            logError('error on write: ' + error.message);
        }
    }

    //private methods

    function parseDataFile(configName, defaults) {

        var filePath = getFilePath(configName);
        logInfo('path = ' + filePath);

        try {
            return JSON.parse(fs.readFileSync(filePath), 'utf8');
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
