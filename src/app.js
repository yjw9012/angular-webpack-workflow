import 'bootstrap/dist/css/bootstrap.css';
import angular from 'angular';
import _ from 'underscore';

var model = {
    user: "Jiwoong"
};

var todoApp = angular.module("todoApp", []);


todoApp.run(function ($http) {
    $http({
        method: 'GET',
        url: 'todo.json'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        model.items = response.data;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
    });

});

todoApp.controller("ToDoCtrl", function ($scope) {
    $scope.todo = model;

    $scope.incompleteCount = function () {
        var count = 0;
        _.each($scope.todo.items, function (item) {
            if (!item.done) {
                count++;
            }
        });
        return count;
    };

    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    };

    $scope.addNewItem = function (action) {
        $scope.todo.items.push({action: action, done: false});
    };
});

todoApp.filter("checkedItems", function () {
    return function (items, showComplete) {
        var resultArr = [];
        _.each(items, function (item) {
            if (!item.done || showComplete) {
                resultArr.push(item);
            }
        });
        return resultArr;
    };
});