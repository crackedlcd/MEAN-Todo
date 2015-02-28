var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  description: String,
  checked: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);