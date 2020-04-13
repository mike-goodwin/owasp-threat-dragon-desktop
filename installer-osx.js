var createDMG = require('electron-installer-dmg');

var options = {
    appPath: './build/OWASP-Threat-Dragon-darwin-x64/OWASP-Threat-Dragon.app',
    name: 'OWASP-Threat-Dragon',
    out: './installers/osx-x64',
    overwrite: true,
    icon: './content/icons/icon.icns'
};

createDMG(options, function done (err) { 
    if(err) {
        console.log(err.message);
    } else {
        console.log("Success!");
    }
});
