var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branch_schema = new Schema({
branch_name:String,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('branch',branch_schema);