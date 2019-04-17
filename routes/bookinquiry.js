var express = require('express');
var router = express.Router();
var bookinquirydatabase = require('../schema/Books_inquiry_table');
/* GET home page. */
router.get('/books_inquiry_form', function(req, res, next) {
  res.render('books_inquiry_form');
});
router.post('/books_inquiry_form', function(req, res, next) {
    console.log(req.body);
    console.log("-------------------");
    const bookinquirybodydata={
        
        inquiry:req.body.inquiry,
        price:req.body.price,
        details:req.body.details
    
      }
      console.log("------------------------------");
    console.log(bookinquirybodydata);
    var data = bookinquirydatabase (bookinquirybodydata);

    data.save(function(err){
    
        if(err){
          console.log("Error In Insert Record");
        }else{
          res.redirect('/bookinquiry/books_inquiry_display');
        }
      
      })

});
router.get('/books_inquiry_display',function(req,res,next){
    bookinquirydatabase.find(function(err,data){
  
      if(err){
        console.log("Error In Fetch Data"+ err)  
      }else{
        console.log(data);
        res.render('books_inquiry_display',{books_inquiry_array :data});
      }
    });
  });

  router.get('/edit/:id',function(req,res,next){
    
 
    bookinquirydatabase.findById(req.params.id,function(err,db_books_inquiry){
      if(err){
        console.log("Error is Single Record Fetch"+err);
      }else{
        console.log(db_books_inquiry);
        res.render('books_inquiry_edit',{books_inquiry_array:db_books_inquiry});
      }
    });
  });
  router.post('/edit/:id',function(req,res,next) {

    const bookinquirybodydata={
        
        inquiry:req.body.inquiry,
        price:req.body.price,
        details:req.body.details
    
      }
      bookinquirydatabase.findByIdAndUpdate(req.params.id,bookinquirybodydata,function(err){

        if(err){
          console.log("Error in Record Update");
          res.redirect('/bookinquiry/books_inquiry_edit');
        }else{
          res.redirect('/bookinquiry/books_inquiry_display');
        }
      
      });

  });
  router.get('/show/:id',function(req,res){
    console.log(req.params.id);
    console.log("---------------------------");
    bookinquirydatabase.findById(req.params.id,function(err,db_books_inquiry){
  
      if(err){
        console.log("error in single Record fetch" + err );
      }else{
        console.log(db_books_inquiry);
        res.render('books_inquiry_show',{books_inquiry_array:db_books_inquiry});
      } 
  
    });
  });

  router.get('/delete/:id', function(req, res, next) {
    console.log(req.params.id);
    bookinquirydatabase.findByIdAndDelete(req.params.id,function(err,db_books_inquiry){
      if(err){
        console.log("Error is Single Recode Fetch "+err);
        res.redirect('/books_inquiry_display');
      }
      else{
        console.log("Recode Delet");
        res.redirect('/bookinquiry/books_inquiry_display');
      }
    
    });
  });

module.exports = router;
