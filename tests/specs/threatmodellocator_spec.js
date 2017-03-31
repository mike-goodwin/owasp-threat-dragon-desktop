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
        expect(threatmodellocator.newModelLocation).toEqual('/new');
    });

    it('should return a model location object', function () {

        var action = 'action';

        var params = {
            action: action
        };

        var location = threatmodellocator.getModelLocation(params);
        expect(location.action).toEqual(action);
    });

    it('should return a model path', function () {

        var action = 'action'

        var params = {
            action: action
        };

        expect(threatmodellocator.getModelPath(params)).toEqual(action);
    });
});
