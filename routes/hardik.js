
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
  // console.log(req.files.College_logo);
  // var myfile = req.files.College_logo;
  
  // var myfilename = myfile.name;
  // console.log("file name"+myfilename);
  // console.log("file:"+myfile+"File Name: "+myfilename);
  
  // myfile.mv("public/"+myfilename, function(err){
  
  //   if(err){
  //     return res.status(500).send(err);
  //   }
  // });
  // var1=req.body.College_cpassword;
  // req.session.College_cpassword=var1;
  // console.log(req.session.cname);

    
 // res.send("First Name:"+req.body.fname+"<br/>"+"Last Name:"+req.body.lname+"<br/>"+"Email Id:"+req.body.ename+"<br/>"+"Mobile No:"+ req.body.mname);
  
  const mybodydata = {
   
    College_name:req.body.College_name,  
    
  }
  console.log(mybodydata);
    var  data =  Collegemodel(mybodydata);
  
    data.save(function(err){
  
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/College_display');
    }
  })



});



router.get('/edit/:id', function(req, res, next) {
  
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


router.post('/edit/:id', function(req, res, next) {


  const mybodydata = {
    College_name:req.body.College_name,  
   
    
   
  }
  console.log(mybodydata);
  Collegemodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/College_display');
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

router.get('/delete/:id', function(req, res, next) {
  
  console.log(req.params.id);
  Collegemodel.findByIdAndDelete(req.params.id,function(err,db_College_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/College_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/College_display',);
    }

  });
});
