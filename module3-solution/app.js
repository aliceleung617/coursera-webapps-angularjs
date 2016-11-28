(function() {
    'use strict';

    angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", foundItems);


    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.getMatchedMenuItems = function(searchTerm) {
            ctrl.error = false;
            ctrl.found = [];
            if (!searchTerm) {
                ctrl.error = true;
                return;
            }
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function(result) {
                    if (!result || result.length == 0) {
                        ctrl.error = true;
                        return;
                    }
                    ctrl.found = result;
                });

        };

        ctrl.onRemove = function(index) {
            ctrl.found.splice(index, 1);
        }

    }

    MenuSearchService.$inject = ["$http", "$q"];
    function MenuSearchService($http, $q) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            var deferred = $q.defer();
            var response = $http({
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(
                function(result) {
                    var foundItems = [];
                    for (var i = 0; i < result.data.menu_items.length; i++){
                        var item = result.data.menu_items[i];
                        if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                            foundItems.push(item);
                        }
                    }
                    deferred.resolve(foundItems);
                },
                function(error) {
                    deferred.reject(error);
                }

            );

            return deferred.promise;


        };
    }

    function foundItems() {
        var ddo = {
            restrict: "E",
            templateUrl: "foundItem.html",
            scope: {
                found: "<",
                onRemove: "<"
            },
            link: ShowWarningLink
        };

        return ddo;
    }

    function ShowWarningLink(scope, elements, attrs) {
        scope.$watch
    }
}());