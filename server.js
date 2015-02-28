var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/todoDB');

var Todo = require('./app/models/todo')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening...');
  next();
});

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


app.get('/', function(req, res) {
  res.sendfile('./public/views/index.html');
});

// prefixes all routes with /api
app.use('/api', router)

app.listen(port);
console.log('Magic happing on port ' + port);

exports = module.exports = app;