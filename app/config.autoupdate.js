'use strict'

function autoupdate(common, dialogs, electron) {

    var logInfo = common.logger.getLogFn('config.autoupdate', 'info');

    //adapted from https://github.com/crilleengvall/electron-tutorial-app

    const os = require('os').platform();
    const app = electron.app
    const fs = require('fs');
    const path = require('path');

    // on windows only do this when executing from the installed location
    //https://github.com/electron/electron/issues/4535
    if (os === 'darwin' || fs.existsSync(path.resolve(path.dirname(process.execPath), '..', 'update.exe'))) {

        //temporary hack to get around lack of code signing in OSX
        try {
            const autoUpdater = electron.autoUpdater;
            var feedURL;

            if (os === 'darwin') {
                feedURL = 'https://threatdragondownloads.azurewebsites.net/update/osx/0.1.18';
            } else {
                feedURL = 'https://threatdragondownloads.azurewebsites.net/update/win32/0.1.18';
            }

            autoUpdater.setFeedURL(feedURL);
            autoUpdater.on('update-downloaded', function () {
                dialogs.confirm('./app/layout/update.html', onUpdate, function () { return null; }, function () { });
            });

            function onUpdate() {
                autoUpdater.checkForUpdates();
            }

        }
        catch (e) {
            //do nothing
        }
    }

    logInfo('configured autoupdate');
}

module.exports = autoupdate;
