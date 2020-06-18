'use strict';

var _ = require('lodash');
const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const fs = require('fs');
const path = require('path');
const userDataPath = electron.remote.app.getPath('userData');

function electronservice(common) {

    const log = require('electron').remote.getGlobal('params').logger;
    log.debug('Electron Service logger verbosity level', log.transports.console.level);

    var logInfo = common.logger.getLogFn('electron service', 'info');
    var logError = common.logger.getLogFn('electron service', 'error');

    var service = {
        dialog: {
            save: save,
            saveAsPDF: saveAsPDF,
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
        log.debug('Electron Service save');
        dialog.showSaveDialog(remote.getCurrentWindow(), { defaultPath: "new-model.json", filters: [{ name: 'Threat Models', extensions: ['json'] }] }, function (fileName) {
            if (_.isUndefined(fileName)) {
                log.warn('Electron Service save unsuccessful');
                onNoSave();
            } else {
                log.info('Electron Service save to file', fileName);
                onSave(fileName);
            }
        });
    }

    function saveAsPDF(defaultPath, onSave, onNoSave) {
        log.debug('Electron Service save PDF');
        dialog.showSaveDialog(remote.getCurrentWindow(), { defaultPath: defaultPath, filters: [{name: 'PDF files', extensions: ['pdf'] }] }, function (fileName) {
            if (_.isUndefined(fileName)) {
                log.warn('Electron Service save PDF unsuccessful');
                onNoSave();
            } else {
                log.info('Electron Service save PDF to file', fileName);
                onSave(fileName);
            }
        });
    }

    function open(onOpen, onNoOpen) {
        log.debug('Electron Service open');
        dialog.showOpenDialog(remote.getCurrentWindow(), { filters: [{ name: 'Threat Models', extensions: ['json'] }, { name: 'All Files', extensions: ['*'] }] }, function (fileNames) {
            if (!_.isUndefined(fileNames)) {
                log.info('Electron Service open file', fileNames);
                onOpen(fileNames);
            } else {
                log.info('Electron Service open unsuccessful');
                onNoOpen();
            }
        });
    }

    function getUserData(location) {
        const data = parseDataFile(location.configName, defaultPreferences);
        logInfo('got ' + data);
        log.info('got', data);
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
            log.info('wrote:', JSON.stringify(data));
        }
        catch (error) {
            logError('error on write: ' + error.message);
            log.error('error on write:', error.message);
        }
    }

    //private methods

    function parseDataFile(configName, defaults) {

        var filePath = getFilePath(configName);
        logInfo('path = ' + filePath);
        log.info('path =', filePath);

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
