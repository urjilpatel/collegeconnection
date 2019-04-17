var express = require('express');
var router = express.Router();
var bookdatabase = require('../schema/Books_table');
var bookinquirydatabase = require('../schema/Books_inquiry_table');
var groupdatabase = require('../schema/Group_table');
var materialmodel = require('../schema/Materials_table');
var Collegemodel = require('../schema/College_table');
var databasemodel1 = require('../schema/User_table');
var Branchmodel = require('../schema/Branch_table');
var Semmodel = require('../schema/Sem_table');

/* GET home page. */
router.get('/', function(req, res, next) {
  var mysession = req.session.email1;
if(!mysession){
  res.redirect('/signin');
}
databasemodel1.findById(req.session.userid,function(err,db_user_array){

  databasemodel1.find(function(err,data){
 
    if(err){
    console.log("Error In  Fetch Data " + err)
  }
  else{
      console.log(data);
      res.render('home',{  user_array : data,User_array:db_user_array});
    }

});
});




});
router.get('/contact', function(req, res, next) {
  var mysession = req.session.email1;
if(!mysession){
  res.redirect('/signin');
}
  res.render('contact', { title: 'Express' });
});

//-----------------------------------book----

router.get('/bookadd', function(req, res, next) {
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  res.render('bookadd');
});

router.post('/bookadd', function(req, res, next) {
    console.log(req.body);
    console.log("-------------------------");
    const bookbodydata ={
        bookname:req.body.bookname,
        price:req.body.price,
        status:req.body.status
       }
    console.log(bookbodydata);
    var data = bookdatabase(bookbodydata);

  data.save(function(err){
    if(err) {
      console.log("Error In Insert Record");
    }else{
      res.redirect('/bookview');
    }
 }) 
}); 


router.get('/bookview',function(req,res,next){
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  bookdatabase.find(function(err,data){

    if(err){
      console.log("Error In Fetch Data"+ err)  
    }else{
      console.log(data);
      res.render('bookview',{book_array :data});
    }
  });
});

router.get('/bookinquiry',function(req,res,next){
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  bookinquirydatabase.find(function(err,data){

    if(err){
      console.log("Error In Fetch Data"+ err)  
    }else{
      console.log(data);
      res.render('bookinquiry',{books_inquiry_array :data});
    }
  });
});
router.get('/message', function(req, res, next) {
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  res.render('message', { title: 'Express' });
});
router.get('/signin', function(req, res, next) {
  
  res.render('signin', { title: 'Express' });
});

router.get('/timeline-about', function(req, res, next) {
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
databasemodel1.findById(req.session.userid,function(err,db_user_array){

    console.log(req.session.userid);
    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_user_array);
      res.render('timeline-about',{user_array: db_user_array});
    }
  
  });
});

//-----
router.get('/timeline-friend', function(req, res, next) {
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  databasemodel1.findById(req.session.userid,function(err,db_user_array){

  databasemodel1.find(function(err,data){
 
    if(err){
    console.log("Error In  Fetch Data " + err)
  }
  else{
      console.log(data);
      res.render('timeline-friend',{  user_array : data,User_array:db_user_array});
    }

});
});
});

router.get('/newsfeed-friend', function(req, res, next) {
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  databasemodel1.findById(req.session.userid,function(err,db_user_array){

    databasemodel1.find(function(err,data){
   
      if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
        console.log(data);
        res.render('newsfeed-friend',{  user_array : data,User_array:db_user_array});
      }
  
  });
  });

});

//---------------------------group---
router.get('/groupview', function(req, res, next) {
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  groupdatabase.find(function(err,data){

  if(err){
    console.log("Error In  Fetch Data " + err)
  }
  else{
    console.log(data);
    res.render('groupview',{group_array : data});
  }

});
});

//------------Material---------

router.get('/material',function(req,res,next){
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  materialmodel.find(function(err,data){

    if(err){
      console.log("Error In Fetch Data"+ err)  
    }else{
      console.log(data);
      res.render('material',{material_array :data});
    }
  });
});

//---------------College----------

router.get('/college', function(req, res, next) {
  var mysession = req.session.email1;
  if(!mysession){
    res.redirect('/signin');
  }
  Collegemodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('college',{  College_array : data});
    }

  });
});

//----------------signup---

router.get('/signup', function(req, res, next) {
  Collegemodel.find(function(err, db_College_array) {
    Semmodel.find(function(err, db_sem_array) {
      Branchmodel.find(function(err, db_Branch_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log("college"+db_College_array);
        console.log("sem"+db_sem_array);
        console.log("branch"+db_Branch_array);
        //Render User Array in HTML Table
        res.render('signup', { College : db_College_array,sem:db_sem_array, branch:db_Branch_array});
        
      }
  });
    });
  });





});

router.post('/signup', function (req, res, next) {
  console.log(req.body);
 
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
    }else{
      iname.mv("public/"+ i_card, function(err){
        if(err){
          return res.status(500).send(err);
        }else{

  const signupbodydata={
    fname:req.body.fname,
    email:req.body.email,
    password:req.body.password,
    gender:req.body.gender,
    address:req.body.address,
    mobile_no:req.body.mobile_no,
    area:req.body.area,
    college:req.body.college, 
    branch:req.body.branch,
    date:req.body.date,
    sem: req.body.sem,
    photo:myfilename,
    i_card:i_card
  }
  console.log(signupbodydata);

  var data = databasemodel1(signupbodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Insert Record" + err);
    } else {
      res.redirect('/signin');
    }
  })
}
});
    }
});
});

router.get('/user_display', function(req, res, next) {
  
  databasemodel1.find(function(err, db_subcategory_array){
        
    console.log(db_subcategory_array);
    if (err) res.json({message: 'There are no posts here.'});
    databasemodel1.find({})
    .populate('branch').populate('college')
  
    .exec(function(err, db_subcategory_array) {
      console.log(db_subcategory_array);
      console.log("urjil");
      res.render('user_display',{user_array :db_subcategory_array }); 

    })
  

   
     
  });

  
});

router.get('/edit/:id',function(req,res,next){
  console.log(req.params.id);
  console.log("---------------------------");
  Collegemodel.find(function(err, db_College_array) {
    Semmodel.find(function(err, db_sem_array) {
      Branchmodel.find(function(err, db_Branch_array) {
 
  databasemodel1.findById(req.params.id,function(err,db_user_array){
    console.log(db_user_array);
    if (err) res.json({message: 'There are no posts here.'});
    databasemodel1.findById(req.params.id,{})
    .populate('branch').populate('college').populate('sem')
  
    .exec(function(err, db_user_array) {
     console.log("har");
     console.log(db_user_array);
     res.render('user_edit',{user_array:db_user_array,College : db_College_array,sem:db_sem_array, branch:db_Branch_array});
    });
  });
});   
  });
  });
});

router.post('/edit/:id',function(req,res,next){
  console.log(req.params.id);
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
  
     
        const signupbodydata={
          fname:req.body.fname,
          email:req.body.email,
          password:req.body.password,
          gender:req.body.gender,
          address:req.body.address,
          mobile_no:req.body.mobile_no,
          area:req.body.area,
          college:req.body.college, 
          branch:req.body.branch,
          date:req.body.date,
          sem: req.body.sem,
          photo:myfilename,
          
        }
          console.log(signupbodydata);
          databasemodel1.findByIdAndUpdate(req.params.id,signupbodydata,function(err){
    
            if(err){
              console.log("Error In Record Update");
              res.redirect('/user_edit');
            }else{
              res.redirect('/');
            }
          
            });
        
        }
      
     });

    }else{  

      console.log(req.body.past_photo);
      var myfile = req.body.past_photo;
      
            const signupbodydata = {
       
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
            console.log(signupbodydata);
         
            databasemodel1.findByIdAndUpdate(req.params.id,signupbodydata,function(err){
      
            if(err){
              console.log("Error In Record Update");
              res.redirect('/user_edit');
            }else{
              res.redirect('/');
            }
          
            });
        
          
    }


     
 
});

router.get('/show/:id',function(req,res){
  console.log(req.params.id);
  console.log("---------------------------");
  databasemodel1.findById(req.params.id,function(err,db_user_array){
    console.log(db_user_array);
    if (err) res.json({message: 'There are no posts here.'});
    databasemodel1.findById(req.params.id,{})
    .populate('branch').populate('college').populate('sem')
  
    .exec(function(err, db_user_array) {
     console.log("har");
     console.log(db_user_array);
     res.render('user_show',{user_array:db_user_array});
    
  });
  });
});



//---------------------signin-------

router.get('/signin',function(req,res,next)
{
res.render('signin');
});

router.post('/loginprosee', function(req, res, next) {
  
  var var1 = req.body.email;
  var var2 =req.body.password;
  console.log("I am Variable "+ var1);
  req.session.mysession = var1;
  res.cookie("Email" , var2 , {maxAge : 600000});
  
  console.log("I am Session " + req.session.mysession);
 
  
  var email1 = req.body.email;
  var password1= req.body.password;

  console.log(req.body);
  databasemodel1.findOne({ "email": email1 }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.email;
      var db_password = db_users_array.password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.render("signin");
    }
    else if (db_email == email1 && db_password == password1) {
      req.session.userid=db_users_array._id;
      req.session.email1 = db_email;
      console.log("urjil"+req.session.userid);
      res.redirect('/');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});
router.get('/logout',function(req,res,next)
{
  req.session.destroy();
res.redirect('signin');
});

//------------------------Forget pass---------

router.get('/forgot_password', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});
 
router.post('/forgot_password', function(req, res, next) {
  var email = req.body.email; 

  console.log(req.body);
  databasemodel1.findOne({ "email": email }, function (err, db_Users_array) {

    console.log("Find One " + db_Users_array);

    if (db_Users_array) {
      var db_email = db_Users_array.email;
      var db_password = db_Users_array.password;

    }

    console.log("db_Users_array.email " + db_email);
    console.log("db_Users_array.password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.render('Admin/error');
    }
    else if (db_email == email) {
     
      
      

      "use strict";
      // setup email data with unicode symbols
  


  const nodemailer = require('nodemailer');
    
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "collegeconnection2019@gmail.com", // generated ethereal user
            pass: "college@123" // generated ethereal password
        }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"College Connection" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "Forgot Password", // Subject line
      text: "Hello your password is  ::-"  + db_password, // plain text body
      html: "Hello your password is ::- "  + db_password // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  res.redirect('signin');
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
  
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});
router.get('/hardik',function(req,res,next){


res.render('hardik1');

});
router.post('/search',function(req,res,next){
  var mysession = req.session.email1;
if(!mysession){
  res.redirect('/signin');
}
var hardik = req.body.fname;
databasemodel1.findById(req.session.userid,function(err,data){
  databasemodel1.find({ $text: {$search: hardik } },{ score: { $meta: "textScore" } }, function (err, db_Users_array){
console.log("Search........"+db_Users_array);
res.render('search',{user_array:db_Users_array,User_array:data});
  }).sort( { score: { $meta: "textScore" } } );
});
});
module.exports = router;
