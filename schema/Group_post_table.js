var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var group_post_schema = new Schema({
group_post:String,
group_id:String,
userid:String,
details:String,
date:Date,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('grouppost',group_post_schema);