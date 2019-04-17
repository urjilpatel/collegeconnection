var express = require('express');
var router = express.Router();

var Collegemodel = require('../schema/College_table');
/* GET Colleges listing. */
router.get('/College', function(req, res, next) {
 
   
     
  res.render('College_form'); 
});

router.get('/College_display', function(req, res, next) {
  Collegemodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('College_display',{  College_array : data});
    }

  });
});




router.post('/College-proess',function(req,res,next)
{
   console.log(req.files.college_logo);
   var myfile = req.files.college_logo;
  
   var myfilename = myfile.name;
   console.log("file name"+myfilename);
   console.log("file:"+myfile+"File Name: "+myfilename);
  
   myfile.mv("public/"+myfilename, function(err){
  
     if(err){
       return res.status(500).send(err);
     }
   });
   
    
 // res.send("First Name:"+req.body.fname+"<br/>"+"Last Name:"+req.body.lname+"<br/>"+"Email Id:"+req.body.ename+"<br/>"+"Mobile No:"+ req.body.mname);
  
  const mybodydata = {
   
    college_name:req.body.college_name,  
    college_logo:myfilename
  }
  console.log(mybodydata);
    var  data =  Collegemodel(mybodydata);
  
    data.save(function(err){
  
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/College/College_display');
    }
  })



});



router.get('/edit3/:id', function(req, res, next) {
  
  console.log(req.params.id);

  Collegemodel.findById(req.params.id,function(err,db_College_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_College_array);
      res.render('College_edit',{College_array: db_College_array});
    }

  });
});


router.post('/edit3/:id', function(req, res, next) {

  if(req.files.new_college_logo){
    console.log(req.files.new_college_logo);
    var myfile = req.files.new_college_logo;
   
    var myfilename = myfile.name;
    console.log("file name"+myfilename);
    console.log("file:"+myfile+"File Name: "+myfilename);
   
    myfile.mv("public/"+myfilename, function(err){
   
      if(err){
        return res.status(500).send(err);
      }else{
        const mybodydata = {
          college_name:req.body.college_name,  
          college_logo:myfilename
          
         
        }
        console.log(mybodydata);
        Collegemodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
          
          if(err){
            console.log("Error in Recode Upadet");
            res.redirect('/form');
      
          }else{
            res.redirect('/College/College_display');
          }
        });
      }
    });
    
  }else{
    console.log(req.body.college_logo);
        var myfile = req.body.college_logo;
  }
  const mybodydata = {
    college_name:req.body.college_name,  
    college_logo:myfile 
  }
  Collegemodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
          
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/College/College_display');
    }
  });
  
  });




router.get('/show/:id', function(req, res, next) {
  
 
  console.log(req.params.id);
  Collegemodel.findById(req.params.id,function(err,db_College_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_College_array);
      res.render('College_show',{College_array: db_College_array});
    }

  });
});

router.get('/delete3/:id', function(req, res, next) {
  
  console.log(req.params.id);
  Collegemodel.findByIdAndDelete(req.params.id,function(err,db_College_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/College_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/College/College_display',);
    }

  });
});

//API start


router.get('/College_form-api', function(req, res, next) {
  res.render('College_form');
});

router.post('/College_form-api', function (req, res, next) {
console.log(req.body);
//var myfile = req.files.cphoto;
//var file = myfile.name;

if (!req.body) {
  return res.send({ "flag": "0", "message": "missing a parameter" });
} else {

  const mybodydata = {
    college_name:req.body.college_name,  
   // College_logo:myfilename
  }
  var data = Collegemodel(mybodydata);  

  data.save(function (err) {
    if (err) {
      return res.send({ "flag": "0", "message": "Error in Record Insert" });
    } else {
      return res.send({ "flag": "1", "message": "Record Added" });
    }
  })
}
});

router.get('/College-view-api', function (req, res, next) {

  Collegemodel.find(function (err, db_College_array) {
  if (err) {
    res.send({ 'error': 'An error has occurred' });
  } else {
 
    if(db_College_array.length > 0)
    {
      console.log(db_College_array);
      var count = db_College_array.length;
      var message = count + " Records Found";

      return res.end(JSON.stringify({db_College_array, "flag": "1", "message": message}));
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
router.get('/College_view-details-api/:id', function (req, res) {
console.log(req.params.id);
Collegemodel.findById(req.params.id, function (err, db_College_array) {
  if (err) {
    res.send({ 'error': 'An error has occurred' });
  } else {
 
    if(db_College_array)
    {
      console.log(db_College_array);
     
      var message = " Records Found";

      return res.end(JSON.stringify({db_College_array, "flag": "1", "message": message}));
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