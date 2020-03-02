'use strict';

function shell($rootScope, $scope, $location, $route, common, datacontext, electron, threatmodellocator, VERSION) {
    var controllerId = 'shell';
    var logSuccess = common.logger.getLogFn(controllerId, 'success');
    var logError = common.logger.getLogFn(controllerId, 'error');

    menuConfigurator();

    $scope.$on('$viewContentLoaded', function () {
        $rootScope.appLoaded = true;
    });

    activate();

    function activate() {
        logSuccess('Threat Dragon loaded!', null, true);
        common.activateController([], controllerId);
    }

    function menuConfigurator() {
        var template = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'New',
                        accelerator: 'CmdOrCtrl+N',
                        click: function() {
                            datacontext.close();
                            $location.path('/threatmodel/new');
                            $scope.$apply();
                        }
                    },
                    {
                        label: 'Open',
                        accelerator: 'CmdOrCtrl+O',
                        click: function() {
                            electron.dialog.open(function (fileNames) {
                                var path = threatmodellocator.getModelPath( fileNames[0]);
                                if ($location.path() == '/threatmodel/' + path) {
                                    $route.reload();
                                } else {
                                    $location.path('/threatmodel/' + path);
                                }
                                $scope.$apply();
                            },
                                function () { });
                        }
                    },
                    {
                        label: 'Open Demo Model',
                        accelerator: 'CmdOrCtrl+D',
                        click: function() {
                            $location.path('/threatmodel/demo');
                            $scope.$apply();
                        }
                    },
                    {
                        label: 'Save',
                        accelerator: 'CmdOrCtrl+S',
                        click() {
                            //fix for issue #43: https://github.com/mike-goodwin/owasp-threat-dragon-desktop/issues/43
                            //feels like a hack - it involves copying data to the (grand)parent scope
                            //can't think of another way to fix this now though - revisit later
                            if ($location.path().includes('/threatmodel/') && $location.path().includes('/diagram/') && $scope.vm.saveDiagram) {
                                $scope.vm.saveDiagram();
                            } else {
                                datacontext.update();
                            }
                        }
                    },
                    {
                        label: 'Save As',
                        click: function() {
                            datacontext.saveAs().then(onSaveAs, onSaveError);

                            function onSaveAs(result) {
                            }

                            function onSaveError(error) {
                                logError(error);
                            }
                        }
                    },
                    {
                        label: 'Close Model',
                        accelerator: 'CmdOrCtrl+F4',
                        click: function() {
                            datacontext.close();
                            $location.path('/');
                            $scope.$apply();
                        }
                    },
                    {
                        label: 'Toggle Developer Tools',
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click: function(item, focusedWindow) {
                            if (focusedWindow) {
                                focusedWindow.webContents.toggleDevTools();
                            }
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
                label: "Edit",
                submenu: [
                    {
                        label: "Undo",
                        accelerator: "CmdOrCtrl+Z",
                        selector: "undo:"
                    },
                    {
                        label: "Redo",
                        accelerator: "Shift+CmdOrCtrl+Z",
                        selector: "redo:"
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "Cut",
                        accelerator: "CmdOrCtrl+X",
                        selector: "cut:"
                    },
                    {
                        label: "Copy",
                        accelerator: "CmdOrCtrl+C",
                        selector: "copy:"
                    },
                    {
                        label: "Paste",
                        accelerator: "CmdOrCtrl+V",
                        selector: "paste:"
                    },
                    {
                        label: "Select All",
                        accelerator: "CmdOrCtrl+A",
                        selector: "selectAll:"
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        label: 'Reload',
                        accelerator: 'CmdOrCtrl+R',
                        click: function(item, focusedWindow) {
                            if (focusedWindow) focusedWindow.reload();
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        accelerator: 'CmdOrCtrl+0',
                        role: 'resetzoom'
                    },
                    {
                        accelerator: 'CmdOrCtrl+=',
                        role: 'zoomin'
                    },
                    {
                        accelerator: 'CmdOrCtrl+-',
                        role: 'zoomout'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        accelerator: 'CmdOrCtrl+F11',
                        role: 'togglefullscreen'
                    }
                ]
            },
            {
                label: 'Window',
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
                label: 'Help',
                submenu: [
                    {
                        label: 'Documentation',
                        click: function() {
                            electron.shell.openExternal('http://docs.threatdragon.org');
                        }
                    },
                    {
                        label: 'Submit an Issue',
                        click: function() {
                            electron.shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop/issues/new');
                        }
                    },
                    {
                        label: 'Visit us on GitHub',
                        click: function() {
                            electron.shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop');
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'About',
                        click: function() {
                            electron.dialog.messageBox({
                                type: 'info',
                                buttons: ['OK'],
                                title: 'About OWASP Threat Dragon',
                                message: 'OWASP Threat Dragon is a free, open-source, cross-platform threat modeling application including system diagramming and a rule engine to auto-generate threats/mitigations. It is an OWASP Incubator Project. (Version ' + VERSION + ')'
                            });
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
