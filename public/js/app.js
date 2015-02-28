var ngTodo = angular.module('ngTodo', ['ngRoute', 'ngResource']);

ngTodo.provider('Todo', function() {
  this.$get = ['$resource', function($resource) {
    var Todo = $resource('/api/todos/:_id', {}, {
      update: {
        method: 'PUT'
      }
    })
    return Todo;
  }];
});