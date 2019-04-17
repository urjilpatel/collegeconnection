var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chat_schema = new Schema({
chatid:String,
userid_to:String,
userid_from:String,
message:String,
date:Date,

});

module.exports = mongoose.model('chat',chat_schema);