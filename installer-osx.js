var createDMG = require('electron-installer-dmg');

var options = {
    appPath: './packages/OWASP Threat Dragon-darwin-x64/OWASP Threat Dragon.app',
    name: 'OWASP Threat Dragon',
    out: './installers/osx-x64',
    overwrite: true,
    icon: 'cupcakes.icns',
    additionalDMGOptions: {
        "code-sign": {
            "signing-identity": '2GVCRR558N'
        }
    }
};

createDMG(options, function done (err) { 
    if(err) {
        console.log(err.message);
    } else {
        console.log("Success!");
    }
});