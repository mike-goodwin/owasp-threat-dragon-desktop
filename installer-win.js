var electronInstaller = require('electron-winstaller');
var path = require('path');
const rootPath = path.join('./');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './packages/threatdragon-win32-x64',
    outputDirectory: './installers/win32-x64',
    authors: 'OWASP',
    exe: 'ThreatDragon.exe',
    noMsi: true,
    loadingGif: './content/icons/png/cupcakes-installing.gif',
    iconUrl: 'https://raw.githubusercontent.com/mike-goodwin/owasp-threat-dragon-desktop/master/content/icons/win/td.ico',
    setupIcon: path.join(rootPath, 'content', 'icons', 'win', 'td.ico'),
    description: 'An open source threat modelling tool from OWASP',
    remoteReleases: "https://github.com/mike-goodwin/owasp-threat-dragon-desktop"
  });
 
resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));