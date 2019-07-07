'use strict';

describe('desktopreport controller', function () {
    
    var $scope;
    var $controller;
    var $httpBackend;
    var $location;
    var $q;
    var common;
    var fsp = require('promise-fs');
    var mockElectron = {
        currentWindow: {
            webContents: {
                printToPDF: function() {}
            }
        },
        dialog: {
            savePDF: function() {}
        }
    };
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

        describe('PDF tests', function() {

            it('should log an error', function() {

                var testError = new Error('test error');
                var testErrorMessage = 'message';
                testError.data = { message: testErrorMessage };
                var errorLogger = jasmine.createSpy('errorLogger');
                var loggerSpy = spyOn(common.logger, 'getLogFn').and.returnValue(errorLogger);

                mockElectron.currentWindow.webContents.printToPDF = function(settings, callback) {
                    callback(testError, null);
                };

                var done = jasmine.createSpy('done');
                
                $controller('desktopreport as vm', { $scope: $scope });
                $scope.$apply();
                loggerSpy.calls.reset();
                $scope.vm.savePDF(done);

                expect(done).toHaveBeenCalled();
                expect($scope.vm.error).toEqual(testError);
                expect(errorLogger).toHaveBeenCalled();
                expect(errorLogger.calls.argsFor(1)).toEqual([testErrorMessage]);

            });

            it('should save the PDF file with default file name', function() {

                var testData = 'data';
                mockElectron.currentWindow.webContents.printToPDF = function(settings, callback) {
                    callback(null, testData);
                };
                var file = 'test';
                mockDatacontext.threatModelLocation = file + '.json';
                var done = jasmine.createSpy('done');
                mockElectron.dialog.savePDF = function(defaultPath, onSave, onCancel) {
                    onSave();
                }
                spyOn(mockElectron.dialog, 'savePDF').and.callThrough();
                spyOn(fsp, 'writeFile').and.returnValue($q.when(null));
                $controller('desktopreport as vm', { $scope: $scope });
                $scope.$apply();
                $scope.vm.savePDF(done);
                $scope.$apply(); //needed to resolve fsp.writefile promise

                expect(done).toHaveBeenCalled();
                expect(fsp.writeFile).toHaveBeenCalled();
                expect(mockElectron.dialog.savePDF).toHaveBeenCalled();
                expect(mockElectron.dialog.savePDF.calls.argsFor(0)[0]).toEqual(file + '.pdf');

            });

            it('should save the PDF file with no default file name', function() {

                var testData = 'data';
                mockElectron.currentWindow.webContents.printToPDF = function(settings, callback) {
                    callback(null, testData);
                };
                var done = jasmine.createSpy('done');
                mockElectron.dialog.savePDF = function(defaultPath, onSave, onCancel) {
                    onSave();
                }
                if (mockDatacontext.threatModelLocation) {
                    delete mockDatacontext.threatModelLocation;
                }
                spyOn(mockElectron.dialog, 'savePDF').and.callThrough();
                spyOn(fsp, 'writeFile').and.returnValue($q.when(null));
                $controller('desktopreport as vm', { $scope: $scope });
                $scope.$apply();
                $scope.vm.savePDF(done);
                $scope.$apply(); //needed to resolve fsp.writefile promise

                expect(done).toHaveBeenCalled();
                expect(fsp.writeFile).toHaveBeenCalled();
                expect(mockElectron.dialog.savePDF).toHaveBeenCalled();
                expect(mockElectron.dialog.savePDF.calls.argsFor(0)[0]).toBeNull();

            });

            it('should set the PDF options', function() {

                spyOn(mockElectron.currentWindow.webContents, 'printToPDF');
                $controller('desktopreport as vm', { $scope: $scope });
                $scope.$apply();
                $scope.vm.savePDF();

                expect(mockElectron.currentWindow.webContents.printToPDF).toHaveBeenCalled();
                var optionsFn = mockElectron.currentWindow.webContents.printToPDF.calls.argsFor(0)[0];
                var options = optionsFn();
                expect(options.landscape).toEqual(false);
                expect(options.marginsType).toEqual(0);
                expect(options.printBackground).toEqual(false);
                expect(options.printSelectionOnly).toEqual(false);
                expect(options.pageSize).toEqual('A4');
            });

            it('should not save the PDF file', function() {

                var testData = 'data';
                mockElectron.currentWindow.webContents.printToPDF = function(settings, callback) {
                    callback(null, testData);
                };
                var done = jasmine.createSpy('done');
                mockElectron.dialog.savePDF = function(defaultPath, onSave, onCancel) {
                    onCancel();
                }
                $controller('desktopreport as vm', { $scope: $scope });
                $scope.$apply();
                $scope.vm.savePDF(done);

                expect(done).toHaveBeenCalled();
            });
        });
    });
});