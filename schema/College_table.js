var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var college_schema = new Schema({
college_name:String,
college_logo:String,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('college',college_schema);