'use strict';

describe('shell controller', function () {

    var $scope;
    var $controller;
    var $q;
    var $httpBackend;
    var mockElectron = {
        Menu: {
            buildFromTemplate: function() { },
            setApplicationMenu: function() { }
        }
    };
    var testMenu = 'test menu';
    var templateMenu;

    beforeEach(function () {

        spyOn(mockElectron.Menu, 'buildFromTemplate').and.returnValue(testMenu);
        spyOn(mockElectron.Menu, 'setApplicationMenu');
        angular.mock.module('app');
        angular.mock.module(function ($provide) {
            $provide.value('electron', mockElectron);
        });

        angular.mock.inject(function ($rootScope, _$controller_, _$httpBackend_) {
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET().respond();
        });

        $controller('shell as vm', { $scope: $scope });
        $scope.$apply();

        templateMenu = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
    });

    it('should be defined', function () {
        expect($scope.vm).toBeDefined();
    });

    it('should set the application menu for the window', function() {
        expect(mockElectron.Menu.buildFromTemplate).toHaveBeenCalled();
        expect(mockElectron.Menu.setApplicationMenu).toHaveBeenCalled();
        expect(mockElectron.Menu.setApplicationMenu.calls.argsFor(0)).toEqual([testMenu]);
    });

    //file:
    //new
    //open
    //open demo
    //save
    //save as
    //close
    //dev tools
    //exit
    //view:
    it('View menu first item should be Reload', function() {
        // todo: test menu action
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'View');
        expect(subMenu.submenu[0].label).toEqual('Reload');
        expect(subMenu.submenu[0].accelerator).toEqual('CmdOrCtrl+R');

        var click = subMenu.submenu[0].click;
        var mockWindow = {
            reload: function() {}
        }
        spyOn(mockWindow, 'reload');
        click(null, mockWindow);
        expect(mockWindow.reload).toHaveBeenCalled();
    });

    it('View menu second item should be a separator', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'View');
        expect(subMenu.submenu[1].type).toEqual('separator');
    });

    it('View menu third item should be reset zoom', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'View');
        expect(subMenu.submenu[2].role).toEqual('resetzoom');
        expect(subMenu.submenu[2].accelerator).toEqual('CmdOrCtrl+0');
    });

    it('View menu fourth item should be zoomin', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'View');
        expect(subMenu.submenu[3].role).toEqual('zoomin');
        expect(subMenu.submenu[3].accelerator).toEqual('CmdOrCtrl+=');
    });

    it('View menu fifth item should be zoomout', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'View');
        expect(subMenu.submenu[4].role).toEqual('zoomout');
        expect(subMenu.submenu[4].accelerator).toEqual('CmdOrCtrl+-');
    });

    it('View menu sixth item should be a separator', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'View');
        expect(subMenu.submenu[5].type).toEqual('separator');
    });

    it('View menu seventh item should be togglefullscreen', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'View');
        expect(subMenu.submenu[6].role).toEqual('togglefullscreen');
        expect(subMenu.submenu[6].accelerator).toEqual('CmdOrCtrl+F11');
    });

    //window:
    it('Window menu first item should be minimize', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'Window');
        expect(subMenu.submenu[0].role).toEqual('minimize');
    });

    it('Window menu second item should be close', function() {
        var template = mockElectron.Menu.buildFromTemplate.calls.argsFor(0)[0];
        var subMenu = getSubMenu(template, 'Window');
        expect(subMenu.submenu[1].role).toEqual('close');
    });
    //help:
    //docs
    //submit issue
    //github

    function getSubMenu(template, label) {

        return template.find( function(item) {
            return item.label == label;
        });
    };
});