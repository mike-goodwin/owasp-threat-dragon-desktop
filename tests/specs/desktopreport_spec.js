'use strict';

describe('desktopreport controller', function () {
    
    var $scope;
    var $controller;
    var $httpBackend;
    var $location;
    var $q;
    var common;
    var mockElectron = {};
    var mockDatacontext = {
        load: function() { return $q.when(null);}
    }
    var mockThreatModelLocator = {
        getModelLocation: function() {}
    }
    
    beforeEach(function () {

        angular.mock.module('app');
        angular.mock.module(function ($provide) {
            $provide.value('electron', mockElectron);
            $provide.value('datacontext', mockDatacontext);
            $provide.value('threatmodellocator', mockThreatModelLocator);
        });
        
        angular.mock.inject(function ($rootScope, _$q_, _$controller_, _$location_, _$httpBackend_, _common_) {
            $scope = $rootScope.$new();
            $q = _$q_;
            $controller = _$controller_;
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            common = _common_;
            $httpBackend.expectGET().respond();
        });
    });
    
    describe('initialisation tests', function () {

        beforeEach(function() {
            $controller('desktopreport as vm', { $scope: $scope });
            $scope.$apply();
        });

        it('should be defined', function () {
            expect($scope.vm).toBeDefined();
        });
        
        it('should have "Threat Model Report" for its title', function () {
            expect($scope.vm.title).toEqual('Threat Model Report');
        });

    });

    describe('viewmodel tests', function () {

        it('should set the loaded flag', function () {
            
            $controller('desktopreport as vm', { $scope: $scope });
            $scope.$apply();
            $scope.vm.loaded = false;
            $scope.vm.onLoaded();
            expect($scope.vm.loaded).toEqual(true);

        });

        it('should load from the datacontext', function() {

            var testModel = 'test model';
            var testLocation = 'test location';
            spyOn(mockDatacontext, 'load').and.returnValue($q.when(testModel));
            spyOn(mockThreatModelLocator, 'getModelLocation').and.returnValue(testLocation);
            $controller('desktopreport as vm', { $scope: $scope });
            $scope.$apply();
            expect(mockDatacontext.load.calls.argsFor(0)[0]).toEqual(testLocation);
            expect($scope.vm.threatModel).toEqual(testModel);
        });

        it('should log an error', function() {

            var testError = new Error('test error');
            var testErrorMessage = 'message';
            testError.data = { message: testErrorMessage };
            var errorLogger = jasmine.createSpy('errorLogger');
            var loggerSpy = spyOn(common.logger, 'getLogFn').and.returnValue(errorLogger);
            $controller('desktopreport as vm', { $scope: $scope });
            $scope.$apply();

            $scope.vm.error = null;
            loggerSpy.calls.reset();
            $scope.vm.onError(testError);
            expect($scope.vm.error).toEqual(testError);
            expect(errorLogger).toHaveBeenCalled();
            expect(errorLogger.calls.argsFor(1)).toEqual([testErrorMessage]);
        });
    });
});