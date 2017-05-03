//adapted from https://github.com/crilleengvall/electron-tutorial-app

const electron = require('electron')
const app = electron.app
const fs = require('fs');
const path = require('path');
const dialog = electron.dialog;

//autoupdater setup

//only do this when executing from the installed location
//https://github.com/electron/electron/issues/4535
if (fs.existsSync(path.resolve(path.dirname(process.execPath), '..', 'update.exe'))) {

    const autoUpdater = electron.autoUpdater;
    const feedURL = 'https://threatdragondownloads.azurewebsites.net/update/win32/0.1.6';
    autoUpdater.setFeedURL(feedURL);
    autoUpdater.on('update-downloaded', function () {

        var options = {
            type: 'question',
            buttons: ['Not Now', 'Install'],
            defaultId: 1,
            title: 'Install Update?',
            message: 'A new version of OWASP Threat Dragon is available. Do you want to restart and install it?',
            icon: './content/icons/png/256x256.png'
        };
        if (dialog.showMessageBox(electron.BrowserWindow.getCurrentWindow(), options) === 1) {
            autoUpdater.quitAndInstall();
        }
    });

    autoUpdater.checkForUpdates();
}

//squirrel events
module.exports = {
    handleSquirrelEvent: function () {
        if (process.argv.length === 1) {
            return false;
        }

        const ChildProcess = require('child_process');
        const path = require('path');

        const appFolder = path.resolve(process.execPath, '..');
        const rootAtomFolder = path.resolve(appFolder, '..');
        const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
        const exeName = path.basename(process.execPath);
        const spawn = function (command, args) {
            let spawnedProcess, error;

            try {
                spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
            } catch (error) { }

            return spawnedProcess;
        };

        const spawnUpdate = function (args) {
            return spawn(updateDotExe, args);
        };

        const squirrelEvent = process.argv[1];
        switch (squirrelEvent) {
            case '--squirrel-install':
            case '--squirrel-updated':
                // Install desktop and start menu shortcuts
                spawnUpdate(['--createShortcut', exeName]);
                setTimeout(app.quit, 1000);
                return true;

            case '--squirrel-uninstall':
                // Remove desktop and start menu shortcuts
                spawnUpdate(['--removeShortcut', exeName]);
                setTimeout(app.quit, 1000);
                return true;

            case '--squirrel-obsolete':
                app.quit();
                return true;
        }
    }
}
