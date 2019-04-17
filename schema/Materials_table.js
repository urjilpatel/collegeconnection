var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materials_schema = new Schema({
materialname:String,
collegeid:String,
branchid:String,
sem_id:String,
details:String,
path:String
});

module.exports = mongoose.model('materials',materials_schema);