'use strict';

describe('welcome controller', function () {
    
    var $scope;
    var $controller;
    var $httpBackend;
    var $location;
    var $route;
    var mockElectron = {
        dialog: {
            open: function() {}
        }
    };
    var mockDatacontext = {
    };
    
    beforeEach(function () {
        
        angular.mock.module('app');
        angular.mock.module(function ($provide) {
            $provide.value('electron', mockElectron);
            $provide.value('datacontext', mockDatacontext);
        });
        
        angular.mock.inject(function ($rootScope, _$controller_, _$location_, _$httpBackend_, _$route_) {
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET().respond();
            $route = _$route_;
        });

        $controller('welcome as vm', { $scope: $scope });
        $scope.$apply();
    });
    
    describe('initialisation tests', function () {

        it('should be defined', function () {
            expect($scope.vm).toBeDefined();
        });
        
        it('should have "Welcome" for its title', function () {
            expect($scope.vm.title).toEqual('Welcome');
        });

        
    });
    
    describe('viewmodel tests', function () {

        it('should open a model file', function() {
            var testFileName = 'test file name';
            var testFilenames = [testFileName];
            mockElectron.dialog.open = function(f) {
                f(testFilenames);
            }
            
            spyOn($scope, '$apply').and.callThrough();
            spyOn($location, 'path').and.callThrough();
            $scope.vm.openModel();

            expect($location.path.calls.count()).toEqual(2);
            expect($location.path()).toEqual('/threatmodel/file');
            expect($scope.$apply).toHaveBeenCalled();
            expect(mockDatacontext.threatModelLocation).toEqual(testFileName);
        });

        it('should not open a model - reload', function() {
            var testFileName = 'test file name';
            var testFilenames = [testFileName];
            mockElectron.dialog.open = function(f) {
                f(testFilenames);
            }
        
            spyOn($scope, '$apply').and.callThrough();
            spyOn($location, 'path').and.returnValue('/threatmodel/file');
            spyOn($route, 'reload').and.callThrough();
            $scope.vm.openModel();
            expect($location.path.calls.count()).toEqual(1);
            expect($scope.$apply).toHaveBeenCalled();
            expect(mockDatacontext.threatModelLocation).toEqual(testFileName);
            expect($route.reload).toHaveBeenCalled();
        });
    });
    
    it('should note open a model - cancel', function() {
        var testFileName = 'test file name';
        var testFilenames = [testFileName];
        var testLocation = 'test location';
        mockDatacontext.threatModelLocation = testLocation;
        mockElectron.dialog.open = function(f, g) {
            g(testFilenames);
        }
    
        spyOn($scope, '$apply').and.callThrough();
        spyOn($location, 'path').and.returnValue('/threatmodel/file');
        $scope.vm.openModel;
        expect($location.path).not.toHaveBeenCalled();
        expect($scope.$apply).not.toHaveBeenCalled();
        expect(mockDatacontext.threatModelLocation).toEqual(testLocation);
    });
});

