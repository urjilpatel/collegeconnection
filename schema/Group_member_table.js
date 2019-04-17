var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var group_member_schema = new Schema({
group_id:String,
userid:String
});

module.exports = mongoose.model('groupmember',group_member_schema);