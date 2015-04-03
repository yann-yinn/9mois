angular.module('app.page')

  .controller('todoListController', ['$scope', 'listFactory', '$ionicPopup', function($scope, todoFactory, $ionicPopup) {

    $scope.lists = todoFactory.getAllLists();

    $scope.showDelete = false;

    $scope.toggleDelete = function() {
      $scope.showDelete = !$scope.showDelete;
      return $scope.showDelete;
    };

    $scope.updateList = function(listId) {
      var list = todoFactory.getListById(listId);
      $ionicPopup.prompt({
        title: 'Renommer la liste : " ' + list.name + '" ',
        inputType: 'text',
        inputPlaceholder: list.name
      }).then(function(data) {
        if (!data) {
          return;
        }
        list.name = data;
        todoFactory.updateList(listId, list);
      });
      $scope.lists = todoFactory.getAllLists();
    };

    $scope.deleteList = function(listId) {
      todoFactory.deleteList(listId);
      $scope.lists = todoFactory.getAllLists();
    };

    $scope.add = function() {
      $ionicPopup.prompt({
        title: 'Entrez un nom pour cette nouvelle liste',
        inputType: 'text'
      }).then(function(data) {
        if (!data) {
          return;
        }
        var list = {
          name: data
        };
        todoFactory.createList(list);
      })
    }

  }]);