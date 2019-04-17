var express = require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
var databasemodel1 = require('../schema/User_table');

/* GET users listing. */
///--------------------------------------------------------------------------------------------------------------------------
router.get('/User_form', function(req, res, next) {
  res.render('User_form');
});



router.post('/User_form',function(req,res){
  console.log(req.body);
  console.log("---------------------");
  
  console.log(req.files.photo);
  var myfile = req.files.photo;
  var myfilename = myfile.name;
  
  var iname = req.files.i_card;
  var i_card = iname.name;
  
  console.log("file name"+myfilename);
  console.log("---------------------");
  console.log("file name"+i_card);
  myfile.mv("public/"+myfilename, function(err){
    if(err){
      return res.status(500).send(err);
    }
    else{

    iname.mv("public/"+i_card, function(err){
      if(err){
        return res.status(500).send(err);
      }
      else
      {
          const userbodydata = {
          fname:req.body.fname,  
          email:req.body.email,
          password:req.body.password,
          gender:req.body.gender,
          college:req.body.college,
          branch:req.body.branch,
          area:req.body.area,
          mobile_no:req.body.mobile_no,
          photo:myfilename,
          sem:req.body.sem,
          date:req.body.date,
          address:req.body.address,
          i_card:i_card
        }
        console.log(userbodydata);
        var  data =  databasemodel1(userbodydata);
        
        data.save(function(err){
          if (err) {
            console.log("Error In Insert Record");
          }
          else
          {
            res.redirect('/users/User_display');
          }
        });
      }
      });
    }
   });
});
///-------------------------------------------------------------------------------------------------------
router.get('/User_display', function(req, res, next) {
        
    databasemodel1.find(function(err,data){
      if(err){
        console.log("Error In Fetch Data"+ err);
      }else{
        console.log(data);
        res.render('User_display',{user_array :data }); 
      }
    });
});
//----------------------------------------------------------------------------------------------------------------
router.get('/edit/:id',function(req,res,next){
  console.log(req.params.id);
    databasemodel1.findById(req.params.id,function(err,db_user_array){
      if(err){
        console.log("Error is Edit Record Fetch"+ err);
      }else{
        console.log(db_user_array);
        res.render('User_edite',{user_array :db_user_array});
      }
    
    });
});

router.post('/edit/:id',function(req,res,next){
  console.log(req.body);
  console.log("--------------------------------------------");
  if(req.files.new_photo){

    console.log(req.files.new_photo);
    var myfile = req.files.new_photo;
    var myfilename = myfile.name;
    
    
    
    console.log("file name"+myfilename);
    console.log("---------------------");
    
    myfile.mv("public/"+myfilename, function(err){
      if(err){
        return res.status(500).send(err);
      }
      else{
  
     
            const userbodydata = {
            fname:req.body.fname,  
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            college:req.body.college,
            branch:req.body.branch,
            area:req.body.area,
            mobile_no:req.body.mobile_no,
            photo:myfilename,
            sem:req.body.sem,
            date:req.body.date,
            address:req.body.address,

          }
          console.log(userbodydata);
          databasemodel1.findByIdAndUpdate(req.params.id,userbodydata,function(err){
    
            if(err){
              console.log("Error In Record Update");
              res.redirect('/users/User_edite');
            }else{
              res.redirect('/users/User_display');
            }
          
            });
        
        }
      
     });


  }else{  

    console.log(req.body.past_photo);
    var myfile = req.body.past_photo;
    
          const userbodydata = {
     
            fname:req.body.fname,  
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            college:req.body.college,
            branch:req.body.branch,
            area:req.body.area,
            mobile_no:req.body.mobile_no,
            photo:myfile,
            sem:req.body.sem,
            date:req.body.date,
           address:req.body.address,
           
          }
          console.log(userbodydata);
       
          databasemodel1.findByIdAndUpdate(req.params.id,userbodydata,function(err){
    
          if(err){
            console.log("Error In Record Update");
            res.redirect('/users/User_edite');
          }else{
            res.redirect('/users/User_display');
          }
        
          });
      
        
  }
});
 //-------------------------------------------------------------------
router.get('/show/:id',function(req,res){
  console.log(req.params.id);
  console.log("---------------------------");
  databasemodel1.findById(req.params.id,function(err,db_user_array){

    if(err){
      console.log("error in single Record fetch" + err );
    }else{
      console.log(db_user_array);
      res.render('User_show',{user_array:db_user_array});
    } 

  });
});
//----------------------------------------------------------------------------------------------
router.get('/delete/:id', function(req, res, next) {
  console.log(req.params.id);
  databasemodel1.findByIdAndDelete(req.params.id,function(err,db_user_array){
    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/User_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/users/User_display');
    }
  
  });
});


module.exports = router;
