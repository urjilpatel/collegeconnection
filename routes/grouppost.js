var express = require('express');
var router = express.Router();
var grouppostdatabase = require('../schema/Group_post_table');
/* GET home page. */
router.get('/group_post_form', function(req, res, next) {
  res.render('group_post_form');
});
router.post('/group_post_form', function(req, res, next) {
   console.log(req.body);
   
   const mygrouppostdata = {
    details:req.body.details
  }
   console.log(mygrouppostdata);

   var data =  grouppostdatabase(mygrouppostdata);
   
   data.save(function(err){
    
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/grouppost/group_post_display');
    }
  })

});

router.get('/group_post_display',function(req,res,next){
    grouppostdatabase.find(function(err,data){
  
      if(err){
        console.log("Error In Fetch Data"+ err)  
      }else{
        console.log(data);
        res.render('group_post_display',{grouppost_array :data});
      }
    });
  });

  router.get('/edit/:id',function(req,res,next){
    
 
    grouppostdatabase.findById(req.params.id,function(err,db_grouppost_array){
      if(err){
        console.log("Error is Single Record Fetch"+err);
      }else{
        console.log(db_grouppost_array);
        res.render('group_post_edit',{grouppost_array:db_grouppost_array});
      }
    });
  });

  router.post('/edit/:id',function(req,res,next) {
    const mygrouppostdata = {
      details:req.body.details
    }
    grouppostdatabase.findByIdAndUpdate(req.params.id,mygrouppostdata,function(err){

      if(err){
        console.log("Error in Record Update");
        res.redirect('/grouppost/group_post_edit');
      }else{
        res.redirect('/grouppost/group_post_display');
      }
    
    });
  });
  
  router.get('/show/:id',function(req,res){
    console.log(req.params.id);
    console.log("---------------------------");
    grouppostdatabase.findById(req.params.id,function(err,db_grouppost_array){
  
      if(err){
        console.log("error in single Record fetch" + err );
      }else{
        console.log(db_grouppost_array);
        res.render('group_post_show',{grouppost_array:db_grouppost_array});
      } 
  
    });
  });

  router.get('/delete/:id', function(req, res, next) {
    console.log(req.params.id);
    grouppostdatabase.findByIdAndDelete(req.params.id,function(err,db_grouppost_array){
      if(err){
        console.log("Error is Single Recode Fetch "+err);
        res.redirect('/grouppost/group_post_display');
      }
      else{
        console.log("Recode Delet");
        res.redirect('/grouppost/group_post_display');
      }
    
    });
  });
module.exports = router;
