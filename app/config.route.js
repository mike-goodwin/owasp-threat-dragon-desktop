'use strict';

var app = require('angular').module('app');

// Collect the routes
app.constant('routes', getRoutes());

// Configure the routes and route resolvers
app.config(['$routeProvider', 'routes', routeConfigurator]);
function routeConfigurator($routeProvider, routes) {

    routes.forEach(function (r) {
        setRoute(r.url, r.config);
    });

    $routeProvider.otherwise({ redirectTo: '/' });

    function setRoute(url, config) {

        $routeProvider.when(url, config);

        return $routeProvider;
    }
}

// Define the routes 
function getRoutes() {
    return [
        {
            url: '/',
            config: {
                templateUrl: './app/welcome/welcome.html',
                title: 'Welcome Page',
                settings: {
                }
            }
        }, {
            url: '/welcome',
            config: {
                templateUrl: './app/welcome/welcome.html',
                title: 'Welcome Page',
                settings: {
                }
            }
        }, {
            url: '/threatmodel/:action',
            config: {
                templateUrl: 'threatmodels/threatmodeldetail.html',
                title: 'Threat Model Page',
                settings: {
                }
            }
        }, {
            url: '/test',
            config: {
                templateUrl: './app/threatmodel/test.html',
                title: 'Test Route',
                settings: {
                }
            }
        }
    ];
}
