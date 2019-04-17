var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var areaschema = new Schema({
areaname:String,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('area',areaschema);