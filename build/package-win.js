var packager = require('electron-packager');

options = {
    dir: './',
    overwrite: true,
    out: './build/packages/threatdragon-win32-x64',
    asar: true,
    prune: true,
    icon: 'cupakes.ico',
    platform: 'win32',
    arch: 'x64',
    derefSymlinks: false,
    win32metadata: {
        CompanyName: 'OWASP',
        FileDescription: 'OWASP Threat Dragon',
        ProductName: 'OWASP Threat Dragon'
    },
    ignore: ['tests|build|.vscode|coverage']
};

packager(options, function done_callback(err, appPaths) {
    console.log(err);
    console.log(appPaths);
});

