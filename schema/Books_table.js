var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var book_schema = new Schema({
bookname:String,
branchid:String,
price:String,
status:String,
bookdetail:String,
userid:String
});

module.exports = mongoose.model('books', book_schema);