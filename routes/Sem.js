var express = require('express');
var router = express.Router();

var Semmodel = require('../schema/Sem_table');
/* GET Sems listing. */
router.get('/Sem', function(req, res, next) {
 
   
     
  res.render('Sem_form'); 
});

router.get('/Sem_display', function(req, res, next) {
  Semmodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('Sem_display',{  Sem_array : data});
    }

  });
});




router.post('/Sem-proess',function(req,res,next)
{
  // console.log(req.files.Sem_logo);
  // var myfile = req.files.Sem_logo;
  
  // var myfilename = myfile.name;
  // console.log("file name"+myfilename);
  // console.log("file:"+myfile+"File Name: "+myfilename);
  
  // myfile.mv("public/"+myfilename, function(err){
  
  //   if(err){
  //     return res.status(500).send(err);
  //   }
  // });
  // var1=req.body.Sem_cpassword;
  // req.session.Sem_cpassword=var1;
  // console.log(req.session.cname);

    
 // res.send("First Name:"+req.body.fname+"<br/>"+"Last Name:"+req.body.lname+"<br/>"+"Email Id:"+req.body.ename+"<br/>"+"Mobile No:"+ req.body.mname);
  
  const mybodydata = {
   
    Sem_name:req.body.Sem_name,  
    
  }
  console.log(mybodydata);
    var  data =  Semmodel(mybodydata);
  
    data.save(function(err){
  
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/Sem/Sem_display');
    }
  })



});



router.get('/edit4/:id', function(req, res, next) {
  
  console.log(req.params.id);

  Semmodel.findById(req.params.id,function(err,db_Sem_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Sem_array);
      res.render('Sem_edit',{Sem_array: db_Sem_array});
    }

  });
});


router.post('/edit4/:id', function(req, res, next) {


  const mybodydata = {
    Sem_name:req.body.Sem_name,  
   
    
   
  }
  console.log(mybodydata);
  Semmodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/Sem/Sem_display');
    }
  });
  });




router.get('/show/:id', function(req, res, next) {
  
 
  console.log(req.params.id);
  Semmodel.findById(req.params.id,function(err,db_Sem_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Sem_array);
      res.render('Sem_show',{Sem_array: db_Sem_array});
    }

  });
});

router.get('/delete4/:id', function(req, res, next) {
  
  console.log(req.params.id);
  Semmodel.findByIdAndDelete(req.params.id,function(err,db_Sem_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/Sem/Sem_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/Sem/Sem_display',);
    }

  });
});

//API start


router.get('/Sem_form-api', function(req, res, next) {
  res.render('Sem_form');
});

router.post('/Sem_form-api', function (req, res, next) {
console.log(req.body);
//var myfile = req.files.cphoto;
//var file = myfile.name;

if (!req.body) {
  return res.send({ "flag": "0", "message": "missing a parameter" });
} else {

  const mybodydata = {
    Sem_name:req.body.Sem_name, 
  }
  console.log(mybodydata);
  var data = Semmodel(mybodydata);  

  data.save(function (err) {
    if (err) {
      return res.send({ "flag": "0", "message": "Error in Record Insert" });
    } else {
      return res.send({ "flag": "1", "message": "Record Added" });
    }
  })
}
});

router.get('/Sem-view-api', function (req, res, next) {

  Semmodel.find(function (err, db_Sem_array) {
  if (err) {
    res.send({ 'error': 'An error has occurred' });
  } else {
 
    if(db_Sem_array.length > 0)
    {
      console.log(db_Sem_array);
      var count = db_Sem_array.length;
      var message = count + " Records Found";

      return res.end(JSON.stringify({db_Sem_array, "flag": "1", "message": message}));
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
router.get('/Sem_view-details-api/:id', function (req, res) {
console.log(req.params.id);
Semmodel.findById(req.params.id, function (err, db_Sem_array) {
  if (err) {
    res.send({ 'error': 'An error has occurred' });
  } else {
 
    if(db_Sem_array)
    {
      console.log(db_Sem_array);
     
      var message =  " Records Found";

      return res.end(JSON.stringify({db_Sem_array, "flag": "1", "message": message}));
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