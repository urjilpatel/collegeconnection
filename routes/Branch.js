var express = require('express');
var router = express.Router();

var Branchmodel = require('../schema/Branch_table');
/* GET Branchs listing. */
router.get('/Branch', function(req, res, next) {
 
   
     
  res.render('branch_form'); 
});

router.get('/Branch_display', function(req, res, next) {
  Branchmodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('Branch_display',{  Branch_array : data});
    }

  });
});




router.post('/Branch-proess',function(req,res,next)
{

  // var1=req.body.Branch_cpassword;
  // req.session.Branch_cpassword=var1;
  // console.log(req.session.cname);

    
 // res.send("First Name:"+req.body.fname+"<br/>"+"Last Name:"+req.body.lname+"<br/>"+"Email Id:"+req.body.ename+"<br/>"+"Mobile No:"+ req.body.mname);
  
  const mybodydata = {
   
    branch_name:req.body.branch_name,  
    
  }
  console.log(mybodydata);
    var  data =  Branchmodel(mybodydata);
  
    data.save(function(err){
  
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/Branch/Branch_display');
    }
  })



});



router.get('/edit2/:id', function(req, res, next) {
  
  console.log(req.params.id);

  Branchmodel.findById(req.params.id,function(err,db_Branch_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Branch_array);
      res.render('Branch_edit',{Branch_array: db_Branch_array});
    }

  });
});


router.post('/edit2/:id', function(req, res, next) {


  const mybodydata = {
    branch_name:req.body.branch_name,  
   
    
   
  }
  console.log(mybodydata);
  Branchmodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/Branch/Branch_display');
    }
  });
  });




router.get('/show/:id', function(req, res, next) {
  
 
  console.log(req.params.id);
  Branchmodel.findById(req.params.id,function(err,db_Branch_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Branch_array);
      res.render('Branch_show',{Branch_array: db_Branch_array});
    }

  });
});

router.get('/delete2/:id', function(req, res, next) {
  
  console.log(req.params.id);
  Branchmodel.findByIdAndDelete(req.params.id,function(err,db_Branch_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/Branch/Branch_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/Branch/Branch_display');
    }

  });
});



//API start


router.get('/branch_form-api', function(req, res, next) {
  res.render('branch_form');
});

router.post('/branch_form-api', function (req, res, next) {
console.log(req.body);
//var myfile = req.files.cphoto;
//var file = myfile.name;

if (!req.body) {
  return res.send({ "flag": "0", "message": "missing a parameter" });
} else {

  const mybodydata = {
    branch_name:req.body.branch_name
  }
  var data = Branchmodel(mybodydata);  

  data.save(function (err) {
    if (err) {
      return res.send({ "flag": "0", "message": "Error in Record Insert" });
    } else {
      return res.send({ "flag": "1", "message": "Record Added" });
    }
  })
}
});

router.get('/branch-view-api', function (req, res, next) {

  Branchmodel.find(function (err, db_Branch_array) {
  if (err) {
    res.send({ 'error': 'An error has occurred' });
  } else {
 
    if(db_Branch_array.length > 0)
    {
      console.log(db_Branch_array);
      var count = db_Branch_array.length;
      var message = count + " Records Found";

      return res.end(JSON.stringify({db_Branch_array, "flag": "1", "message": message}));
     //return res.json(db_category_array);
     //return res.end(JSON.stringify({ a: 1 }));
     //return res.send({ 'error': 'An error has occurred' });
     //return res.json({        errors: ['Failed to create photo']      });

    }else{
      return res.send({ "flag": "0", "message": "No Records Found" });
    }
  }
});
});

//Get Single User By ID
router.get('/branch_view-details-api/:id', function (req, res) {
console.log(req.params.id);
Branchmodel.findById(req.params.id, function (err, db_Branch_array) {
  if (err) {
    res.send({ 'error': 'An error has occurred' });
  } else {
 
    if(db_Branch_array)
    {
      console.log(db_Branch_array);
   
      var message = " Records Found";

      return res.end(JSON.stringify({db_Branch_array, "flag": "1", "message": message}));
     //return res.json(db_users_array);
     //return res.end(JSON.stringify({ a: 1 }));
     //return res.send({ 'error': 'An error has occurred' });
     //return res.json({        errors: ['Failed to create photo']      });

    }else{
      return res.send({ "flag": "0", "message": "No Records Found" });
    }
  }
});
});

module.exports = router;