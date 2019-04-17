var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var semester_schema = new Schema({

Sem_name:String,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('semester',semester_schema);