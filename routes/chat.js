var express = require('express');
var router = express.Router();
var chatbasemodel = require('../schema/Chat_table');

router.get('/chat_display', function(req, res, next) {
    res.render('chat_display'); 
  });
  router.get('/chat_show', function(req, res, next) {
    res.render('chat_show'); 
  });
module.exports = router;