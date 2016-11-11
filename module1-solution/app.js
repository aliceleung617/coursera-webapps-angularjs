(function () {
    'use strict';
    angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

    LunchCheckController.$inject = ["$scope"];

    function LunchCheckController($scope) {
        $scope.message = "";
        $scope.dishes = "";

        $scope.checkTooMuch = function() {
            if ($scope.dishes == "") {
                $scope.message = "Please enter data first!";
            }
            else if ($scope.dishes.split(",").length <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too Much!";
            }

        }
    };
})();