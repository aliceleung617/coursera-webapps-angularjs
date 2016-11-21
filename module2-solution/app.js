(function() {
    'use strict';
    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ["$scope", "ShoppingListCheckOffService"];
    AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"];


    function ToBuyController($scope, ShoppingListCheckOffService) {
        var buy = this;

        buy.itemsToBuy = ShoppingListCheckOffService.itemsToBuy;

        buy.itemWasBought = function(itemIndex) {
            ShoppingListCheckOffService.itemWasBought(itemIndex);
        }
    };

    function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
        var bought = this;
        bought.itemsBought = ShoppingListCheckOffService.itemsBought;
    };

    function ShoppingListCheckOffService() {
        var service = this;

        service.itemsToBuy = [
            {
                name: "cookies",
                quantity: 3
            },
            {
                name: "instant noodles",
                quantity: 2
            },
            {
                name: "frozen burritos",
                quantity: 4
            },
            {
                name: "ice cream bars",
                quantity: 6
            },
            {
                name: "apples",
                quantity: 2
            }
        ];
        service.itemsBought = [];

        service.itemWasBought = function(index) {
            service.itemsBought.push(service.itemsToBuy[index]);
            service.itemsToBuy.splice(index, 1);

        }

    };
})();