var express = require('express');
var router = express.Router();
var Areamodel = require('../schema/Area_table');
/* GET Areas listing. */
router.get('/Area', function(req, res, next) {
 
   
     
  res.render('area_form'); 
});

router.get('/Area_display', function(req, res, next) {
  Areamodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('area_display',{  Area_array : data});
    }

  });
});




router.post('/Area-proess',function(req,res,next)
{

  // var1=req.body.Area_cpassword;
  // req.session.Area_cpassword=var1;
  // console.log(req.session.cname);

    
 // res.send("First Name:"+req.body.fname+"<br/>"+"Last Name:"+req.body.lname+"<br/>"+"Email Id:"+req.body.ename+"<br/>"+"Mobile No:"+ req.body.mname);
  
  const mybodydata = {
   
    areaname:req.body.areaname,  
    
  }
  console.log(mybodydata);
    var  data =  Areamodel(mybodydata);
  
    data.save(function(err){
  
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/Area/area_display');
    }
  })



});



router.get('/edit1/:id', function(req, res, next) {
  
  console.log(req.params.id);

  Areamodel.findById(req.params.id,function(err,db_Area_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Area_array);
      res.render('area_edit',{Area_array: db_Area_array});
    }

  });
});


router.post('/edit1/:id', function(req, res, next) {


  const mybodydata = {
    areaname:req.body.areaname,  
   
    
   
  }
  console.log(mybodydata);
  Areamodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/Area/area_display');
    }
  });
  });




router.get('/show/:id', function(req, res, next) {
  
 
  console.log(req.params.id);
  Areamodel.findById(req.params.id,function(err,db_Area_array){   

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Area_array);
      res.render('area_show',{Area_array: db_Area_array});
    }

  });
});

router.get('/delete/:id', function(req, res, next) {
  
  console.log(req.params.id);
  Areamodel.findByIdAndDelete(req.params.id,function(err,db_Area_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/Area/area_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/Area/area_display');
    }

  });
});
//API start


router.get('/area_form-api', function(req, res, next) {
    res.render('area_form');
});

router.post('/area_form-api', function (req, res, next) {
  console.log(req.body);
  //var myfile = req.files.cphoto;
  //var file = myfile.name;

  if (!req.body) {
    return res.send({ "flag": "0", "message": "missing a parameter" });
  } else {

    const mybodydata = {
      areaname:req.body.areaname
    }
    var data = Areamodel(mybodydata);  

    data.save(function (err) {
      if (err) {
        return res.send({ "flag": "0", "message": "Error in Record Insert" });
      } else {
        return res.send({ "flag": "1", "message": "Record Added" });
      }
    })
  }
});

router.get('/area-view-api', function (req, res, next) {

  Areamodel.find(function (err, db_Area_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
   
      if(db_Area_array.length > 0)
      {
        console.log(db_Area_array);
        var count = db_Area_array.length;
        var message = count + " Records Found";

        return res.end(JSON.stringify({db_Area_array, "flag": "1", "message": message}));
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
router.get('/area-view-details-api/:id', function (req, res) {
  console.log(req.params.id);
  Areamodel.findById(req.params.id, function (err, db_Area_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
   
      if(db_Area_array)
      {
        console.log(db_Area_array);
      
        var message = " Records Found";

        return res.end(JSON.stringify({db_Area_array, "flag": "1", "message": message}));
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