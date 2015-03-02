var Todo = require('./models/todo');

module.exports = function(app, router) {

    // Set up the API, Even though it's only on /todos the final route will be /api/todos
  router.route('/todos')

    // POST /api/todos
    .post(function(req, res) {
      var todo = new Todo();
      todo.description = req.body.description;
      todo.checked = false;

      todo.save(function(err) {
        if(err)
          res.send(err);
        res.json({
          message: 'Todo created!'
        });
      });
    })

    // GET /api/todos
    .get(function(req, res) {
      Todo.find(function(err, todos){
        if(err)
          res.send(err);
        res.json(todos);
      });
    });


  router.route('/todos/:todo_id')
    
    // GET /api/todos/:todo_id
    .get(function(req, res) {
      Todo.findById(req.params.todo_id, function(err, todo) {
        if(err)
          res.send(err);
        res.json(todo);
      });
    })

    // PUT /api/todos/:todo_id
    .put(function(req, res) {
      Todo.findById(req.params.todo_id, function(err, todo) {
        if(err)
          res.send(err);
        
        todo.description = req.body.description;
        todo.checked = req.body.checked;

        todo.save(function(err) {
          if(err)
            res.send(err);
          res.json({
            message: "Todo updated!"
          });

        }); 
      });
    })

    // DELETE /api/todos/:todo_id
    .delete(function(req, res) {
      Todo.remove({
        _id: req.params.todo_id
      }, function(err, todo) {
        if(err)
          res.send(err);
        res.json({
          message: 'Successfully deleted'
        });
        
      });
    });


  // Send index.html on the empty path
  // Won't end up as localhost:8080/api because it's before the app.use call
  app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');
  });

  // prefixes all routes with /api
  app.use('/api', router)

};