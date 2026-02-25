var app = angular.module('milkmanApp', ['ngRoute']);

app.constant('API_BASE_URL', 'http://localhost:8000');

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/login', {
            templateUrl: '/static/js/templates/login.html',
            controller: 'LoginController'
        })
        .when('/staff', {
            templateUrl: '/static/js/templates/staff.html',
            controller: 'StaffController'
        })
        .when('/customer', {
            templateUrl: '/static/js/templates/customer.html',
            controller: 'CustomerController'
        })
        .when('/category', {
            templateUrl: '/static/js/templates/category.html',
            controller: 'CategoryController'
        })
        .when('/product', {
            templateUrl: '/static/js/templates/product.html',
            controller: 'ProductController'
        })
        .when('/subscription', {
            templateUrl: '/static/js/templates/subscription.html',
            controller: 'SubscriptionController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

app.factory('AuthService', ['$http', '$location', 'API_BASE_URL', function($http, $location, API_BASE_URL) {
    var service = {};
    service.token = localStorage.getItem('staffToken');
    service.user = JSON.parse(localStorage.getItem('staffUser') || '{}');

    service.login = function(email, password) {
        return $http.post(API_BASE_URL + '/staff/login/', { email: email, password: password })
            .then(function(response) {
                service.token = response.data.token;
                service.user = { email: response.data.email, id: response.data.staff_id };
                localStorage.setItem('staffToken', service.token);
                localStorage.setItem('staffUser', JSON.stringify(service.user));
                return response.data;
            });
    };

    service.logout = function() {
        service.token = null;
        service.user = {};
        localStorage.removeItem('staffToken');
        localStorage.removeItem('staffUser');
        $location.path('/login');
    };

    service.isLoggedIn = function() {
        return !!service.token;
    };

    return service;
}]);

app.factory('AuthInterceptor', ['$q', '$location', function($q, $location) {
    return {
        request: function(config) {
            var token = localStorage.getItem('staffToken');
            if (token) {
                config.headers.Authorization = 'Token ' + token;
            }
            return config;
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                localStorage.removeItem('staffToken');
                localStorage.removeItem('staffUser');
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);

app.controller('MainController', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.isLoggedIn = AuthService.isLoggedIn();
    $scope.user = AuthService.user;

    $scope.$on('$routeChangeStart', function() {
        $scope.isLoggedIn = AuthService.isLoggedIn();
        $scope.user = AuthService.user;
    });

    $scope.logout = function() {
        AuthService.logout();
    };
}]);
