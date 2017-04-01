'use strict';

function shell($rootScope, $scope, $location, common, config) {
    var controllerId = 'shell';
    var logSuccess = common.logger.getLogFn(controllerId, 'success');
    var events = config.events;

    const electron = require('electron');
    const remote = electron.remote;
    const Menu = remote.Menu;

    menuConfigurator();

    $scope.$on('$viewContentLoaded', function () {
        $rootScope.appLoaded = true;
    });

    activate();

    function activate() {
        logSuccess('Threat Dragon loaded!', null, true);
        common.activateController([], controllerId);
    }

    $rootScope.$on('$routeChangeStart',
        function (event, next, current) { }
    );

    $rootScope.$on(events.controllerActivateSuccess,
        function (data) { }
    );

    function menuConfigurator() {

        var template = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'New',
                        accelerator: 'CmdOrCtrl+N',
                        click() {
                            $location.path('/threatmodel/new');
                            $scope.$apply();
                        }
                    },
                    {
                        label: 'Open',
                        accelerator: 'CmdOrCtrl+O',
                        click() {
                            $location.path('/threatmodel/open');
                            $scope.$apply();
                        }
                    },
                    {
                        label: 'Open Demo Model',
                        accelerator: 'CmdOrCtrl+D',
                        click() {
                            $location.path('/threatmodel/demo');
                            $scope.$apply();
                        }
                    },
                    {
                        label: 'Save',
                        accelerator: 'CmdOrCtrl+C'
                    },
                    {
                        label: 'Close',
                        accelerator: 'CmdOrCtrl+X'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Exit',
                        role: 'close'
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        label: 'Reload',
                        accelerator: 'CmdOrCtrl+R',
                        click(item, focusedWindow) {
                            if (focusedWindow) focusedWindow.reload()
                        }
                    },
                    {
                        label: 'Toggle Developer Tools',
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click(item, focusedWindow) {
                            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'resetzoom'
                    },
                    {
                        role: 'zoomin'
                    },
                    {
                        role: 'zoomout'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'togglefullscreen'
                    }
                ]
            },
            {
                role: 'window',
                submenu: [
                    {
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'Documentation',
                        click() { electron.shell.openExternal('http://docs.threatdragon.org') }
                    },
                    {
                        label: 'Submit an Issue',
                        click() { electron.shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop/issues/new') }
                    },
                    {
                        label: 'Visit us on GitHub',
                        click() { electron.shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop') }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

    }
}

module.exports = shell;