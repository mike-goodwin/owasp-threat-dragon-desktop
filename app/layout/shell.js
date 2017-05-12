'use strict';
const path = require('path');

function shell($rootScope, $scope, $location, $route, common, config, datacontext, electron, dialogs) {
    var controllerId = 'shell';
    var logSuccess = common.logger.getLogFn(controllerId, 'success');
    var logError = common.logger.getLogFn(controllerId, 'error');
    var events = config.events;

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
                            electron.dialog.open(function (fileNames) {
                                datacontext.threatModelLocation = fileNames[0];
                                if ($location.path() == '/threatmodel/file') {
                                    $route.reload();
                                } else {
                                    $location.path('/threatmodel/file');
                                }
                                $scope.$apply();
                            },
                                function () { });
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
                        accelerator: 'CmdOrCtrl+C',
                        click() {
                            datacontext.update();
                        }
                    },
                    {
                        label: 'Save As',
                        click() {
                            datacontext.saveAs().then(onSaveAs, onSaveError);

                            function onSaveAs(result) {
                            }

                            function onSaveError(error) {
                                logError(error);
                            }
                        }
                    },
                    {
                        label: 'Close',
                        accelerator: 'CmdOrCtrl+X',
                        click() {
                            datacontext.close();
                            $location.path('/');
                            $scope.$apply();
                        }
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
                            if (focusedWindow) focusedWindow.reload();
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
                        click() {
                            electron.shell.openExternal('http://docs.threatdragon.org');
                        }
                    },
                    {
                        label: 'Submit an Issue',
                        click() {
                            electron.shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop/issues/new');
                        }
                    },
                    {
                        label: 'Visit us on GitHub',
                        click() {
                            electron.shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop');
                        }
                    },
                    {
                        label: 'Dialog test',
                        click() {

                            dialogs.confirm('./app/layout/update.html', function () { }, function () { return null; }, function () { });

                        }
                    }
                ]
            }
        ];

        const menu = electron.Menu.buildFromTemplate(template);
        electron.Menu.setApplicationMenu(menu);

    }
}

module.exports = shell;