var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_friend_schema = new Schema({
friend_id:String,
userid_to:String,
userid_from:String,
status:String
});

module.exports = mongoose.model('friend',user_friend_schema);