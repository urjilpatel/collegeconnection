var express = require('express');
var router = express.Router();
var bookdatabase = require('../schema/Books_table');
/* GET home page. */

router.get('/bookadd',function(req,res,next){
    bookdatabase.find(function(err,data){
  
      if(err){
        console.log("Error In Fetch Data"+ err)  
      }else{
        console.log(data);
        res.render('bookadd',{book_array :data});
      }
    });
  });

  

module.exports = router;
