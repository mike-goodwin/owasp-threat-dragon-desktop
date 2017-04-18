'use strict';

require('angular-mocks');

describe('threatmodellocator service:', function () {

    var threatmodellocator;
    var $rootScope;

    beforeEach(function () {

        angular.mock.module('app');

        angular.mock.inject(function (_$rootScope_, _threatmodellocator_) {
            $rootScope = _$rootScope_;
            threatmodellocator = _threatmodellocator_;
        });

        $rootScope.$apply();
    });

    it('should return the new model location', function () {
        expect(threatmodellocator.newModelLocation).toEqual('/threatmodel/new');
    });

    it('should return a model location object', function () {

        var file = 'file';

        var params = {
            file: file
        };

        var location = threatmodellocator.getModelLocation(params);
        expect(location.file).toEqual(file);
    });

    it('should return a model path', function () {

        var file = 'unencoded file'

        var params = {
            file: file
        };

        expect(threatmodellocator.getModelPath(params)).toEqual(encodeURI(file));
    });

    it('should return a model path based on route params', function () {

        var file = 'unencoded file'

        var params = {
            file: file
        };

        expect(threatmodellocator.getModelPathFromRouteParams(params)).toEqual(file);
    });
});
