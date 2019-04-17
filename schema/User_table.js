var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
fname:String,
email:String,
password:String,
gender:String,
address:String,
mobile_no:String,
area:String,
photo:String,
date:Date,
i_card:String,
college:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'college'
        },
branch:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'branch'
        },
sem:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'semester'
        },

created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }


});

module.exports = mongoose.model('user',user_schema);