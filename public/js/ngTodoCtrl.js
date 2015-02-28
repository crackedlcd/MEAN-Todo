ngTodo.controller('ngTodoCtrl', ['$scope', '$route', 'Todo', function NgTodoCtrl($scope, $route, Todo) {
  $scope.todo = new Todo();
  $scope.todos = Todo.query();

  $scope.hideChecked = false;

  $scope.save = function(todo, id) {
    if(id) {
      $scope.todo = todo;
      Todo.update({_id: $scope.todo._id }, $scope.todo);
    }
    else {
      $scope.todo.$save().then(function(response) {
        $scope.todos = Todo.query();
      });
    }
    $scope.todo = new Todo();
  }

  $scope.delete = function(todo, index) {
    // Figure out how to handle an error
    Todo.delete(todo);
    $scope.todos.splice(index, 1);
  }

  $scope.isChecked = function(check) {
    if($scope.hideChecked && check) 
      return true;
    else
      return false;
  }
}]);