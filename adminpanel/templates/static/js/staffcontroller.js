app.controller('StaffController', ['$scope', '$http', 'API_BASE_URL', function($scope, $http, API_BASE_URL) {
    $scope.items = [];
    $scope.newItem = {};

    $scope.loadItems = function() {
        $http.get(API_BASE_URL + '/staff/staff/').then(function(response) {
            $scope.items = response.data;
        });
    };

    $scope.addItem = function() {
        console.log($scope.newItem);
        $http.post(API_BASE_URL + '/staff/staff/', $scope.newItem).then(function() {
           $scope.newItem = {};
            $scope.loadItems();
        });
    };

    $scope.deleteItem = function(id) {
        $http.delete(API_BASE_URL + '/staff/staff/' + id + '/').then(function() {
            $scope.loadItems();
        });
    };

    $scope.updateItem = function(id) {
        $http.put(API_BASE_URL + '/staff/staff/' + id + '/', $scope.newItem).then(function() {
            $scope.newItem = {};
            $scope.loadItems();
        });
    };

    //$scope.loadItems();

    $scope.hello = function() {
        console.log("hello");
        alert("hello");
    }
}]);
