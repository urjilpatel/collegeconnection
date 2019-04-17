var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var books_inquiry_schema = new Schema({
bookingid:String,
bookid:String,
userid:String,
inquiry:String,
price:String,
details:String
});

module.exports = mongoose.model('booksinquiry',books_inquiry_schema);