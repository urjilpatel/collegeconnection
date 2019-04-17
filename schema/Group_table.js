var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var group_schema = new Schema({
group_id:String,
group_name:String,
group_logo:String,
details:String
});

module.exports = mongoose.model('group',group_schema);