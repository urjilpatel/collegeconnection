var express = require('express');
var router = express.Router();
var groupdatabase = require('../schema/Group_table');
/* GET home page. */
router.get('/group_form', function(req, res, next) {
    res.render('group_form');
  });
  
  router.post('/group_process', function(req, res, next) {
    console.log("vishal");
    console.log(req.body);
    console.log(req.files.logo);
    var myfile = req.files.logo;
    var myfilename = myfile.name;
    console.log("file name"+myfilename);
  console.log("file:"+myfile+"File Name: "+myfilename);
   
  myfile.mv("public/"+myfilename, function(err){
   
     if(err){
        return res.status(500).send(err);
  }
    });
  
    const mygroupdata = {
      group_name:req.body.gname,
      group_logo:myfilename,
      details:req.body.details
    }
    console.log(mygroupdata);
  
    var data =  groupdatabase(mygroupdata);
    
      data.save(function(err){
    
      if (err) {
        console.log("Error In Insert Record");
      }else{
      res.redirect('/group/group_display');
      }
    })
  });
    // Group display 
  
    router.get('/group_display', function(req, res, next) {
        groupdatabase.find(function(err,data){
      
        if(err){
          console.log("Error In  Fetch Data " + err)
        }
        else{
          console.log(data);
          res.render('group_display',{group_array : data});
        }
    
      });
    });
  
  
  // group edit form
  
  
  router.get('/edit/:id', function(req, res, next) {
    console.log('vishal');
    console.log(req.params.id);
    
    groupdatabase.findById(req.params.id,function(err,db_group_array){
  
      if(err){
        console.log("Error is Single Recode Fetch "+err);
      }
      else{
        console.log(db_group_array);
        res.render('group_edit',{group_array: db_group_array});
      }
  
    });
  });
  
  
  router.post('/edit/:id', function(req, res, next) {
   
    console.log(req.body);

    if(req.files.new_logo){

    console.log(req.files.new_logo);
    var myfile = req.files.new_logo;
    var myfilename = myfile.name;
    console.log("file name"+myfilename);
    console.log("file:"+myfile+"File Name: "+myfilename);
   
    myfile.mv("public/"+myfilename, function(err){
   
     if(err){
        return res.status(500).send(err);
    }else{
      const mygroupdata = {
      group_name:req.body.gname,
      group_logo:myfilename,
      details:req.body.details
    }
  
    console.log(mygroupdata);
    
    groupdatabase.findByIdAndUpdate(req.params.id,mygroupdata,function(err){
      if(err){
        console.log("Error in Recode Upadet");
        res.redirect('/group/group_edit');
  
      }else{
        res.redirect('/group/group_display');
      }
    });
    }
        });
    }else{
        console.log(req.body.logo);
        var myfile = req.body.logo;
        const mygroupdata = {
            group_name:req.body.gname,
            group_logo:myfile,
            details:req.body.details
          }
        
          console.log(mygroupdata);
          
          groupdatabase.findByIdAndUpdate(req.params.id,mygroupdata,function(err){
            if(err){
              console.log("Error in Recode Upadet");
              res.redirect('/group/group_edit');
        
            }else{
              res.redirect('/group/group_display');
            }
          });
    }
  });
  // delete group form data
  
  router.get('/delete/:id', function(req, res, next) {
    
    console.log(req.params.id);
    groupdatabase.findByIdAndDelete(req.params.id,function(err,db_group_array){
  
      if(err){
        console.log("Error is Single Recode Fetch "+err);
        res.redirect('/group/group_display');
      }
      else{
        console.log("Recode Delet");
        res.redirect('/group/group_display');
      }
  
    });
  });
  // show group details
  
  router.get('/show/:id',function(req,res) {
    console.log(req.params.id);
  
    groupdatabase.findById(req.params.id,function(err,db_group_array) {
      if (err) {
        console.log("Error in Single Record Fetch"+ err);
      } else {
        console.log(db_group_array);
  
        res.render('group_show',{group_array : db_group_array});
      }
    });
  });
  module.exports = router;