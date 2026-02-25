app.controller('CategoryController', ['$scope', '$http', 'API_BASE_URL', function($scope, $http, API_BASE_URL) {
    $scope.items = [];
    $scope.newItem = {};

    $scope.loadItems = function() {
        $http.get(API_BASE_URL + '/category/category/').then(function(response) {
            $scope.items = response.data;
        });
    };

    $scope.addItem = function() {
        $http.post(API_BASE_URL + '/category/category/', $scope.newItem).then(function() {
            $scope.newItem = {};
            $scope.loadItems();
        });
    };

    $scope.deleteItem = function(id) {
        $http.delete(API_BASE_URL + '/category/category/' + id + '/').then(function() {
            $scope.loadItems();
        });
    };
    

    $scope.updateItem = function(id) {
        $http.put(API_BASE_URL + '/category/category/' + id + '/', $scope.newItem).then(function() {
            $scope.newItem = {};
            $scope.loadItems();
        });
    };

    $scope.loadItems();
}]);
