var express = require('express');
var router = express.Router();
var materialmodel = require('../schema/Materials_table');
/* GET home page. */
router.get('/materials_form', function(req, res, next) {
  res.render('materials_form');
});
router.post('/materials_form', function(req, res, next) {
    console.log(req.body);

    const mymaterialtdata = {
        details:req.body.details
      }

      console.log(mymaterialtdata);

   var data =  materialmodel(mymaterialtdata);
   
   data.save(function(err){
    
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/material/materials_display');
    }
  })
  });
  router.get('/materials_display',function(req,res,next){
    materialmodel.find(function(err,data){
  
      if(err){
        console.log("Error In Fetch Data"+ err)  
      }else{
        console.log(data);
        res.render('materials_display',{material_array :data});
      }
    });
  });

  router.get('/edit/:id',function(req,res,next){
    
 
    materialmodel.findById(req.params.id,function(err,db_material_array){
      if(err){
        console.log("Error is Single Record Fetch"+err);
      }else{
        console.log(db_material_array);
        res.render('materials_edit',{material_array:db_material_array});
      }
    });
  });
  router.post('/edit/:id',function(req,res,next) {
    const mymaterialtdata = {
      details:req.body.details
    }
    materialmodel.findByIdAndUpdate(req.params.id,mymaterialtdata,function(err){

      if(err){
        console.log("Error in Record Update");
        res.redirect('/material/materials_edit');
      }else{
        res.redirect('/material/materials_display');
      }
    
    });
  });
  router.get('/show/:id',function(req,res){
    console.log(req.params.id);
    console.log("---------------------------");
    materialmodel.findById(req.params.id,function(err,db_material_array){
  
      if(err){
        console.log("error in single Record fetch" + err );
      }else{
        console.log(db_material_array);
        res.render('materials_show',{material_array:db_material_array});
      } 
  
    });
  });
  router.get('/delete/:id', function(req, res, next) {
    console.log(req.params.id);
    materialmodel.findByIdAndDelete(req.params.id,function(err,db_material_array){
      if(err){
        console.log("Error is Single Recode Fetch "+err);
        res.redirect('/material/materials_display');
      }
      else{
        console.log("Recode Delet");
        res.redirect('/material/materials_display');
      }
    
    });
  });
module.exports = router;