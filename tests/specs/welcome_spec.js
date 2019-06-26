'use strict';

describe('welcome controller', function () {
    
    var $scope;
    var $controller;
    var $httpBackend;
    var $location;
    var mockElectron = {
        dialog: {
            open: function() {}
        }
    };
    var testVersion = 'version';
    
    beforeEach(function () {
        
        angular.mock.module('app');
        angular.mock.module(function ($provide) {
            $provide.value('electron', mockElectron);
            $provide.value('VERSION', testVersion);
        });
        
        angular.mock.inject(function ($rootScope, _$controller_, _$location_, _$httpBackend_) {
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET().respond();
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
        
        it('should set the version', function () {

            expect($scope.vm.version).toEqual(testVersion);

        });

        it('should open a file open diaglog', function () {
            
            spyOn(mockElectron.dialog, 'open');
            $scope.vm.openModel();
            expect(mockElectron.dialog.open).toHaveBeenCalled();

        });
    });
});