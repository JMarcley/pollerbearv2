var express = require('express');
var users = require('../controllers/users');
var axios = require('axios');

module.exports = function (app) {

  // app.get('/axios/*', users.getUserInfo);
    // next();
    // res.redirect('../user');
    // res.status(200).json({user: 'present'});

  app.get('/axios/*', function(req, res, next) {
    console.log('req.user - axios');
    axios.get('https://localhost:' + app.get('port') + '/user');
    // next();
    // res.redirect('../user');
    // res.status(200).json({user: 'present'});
  });

}
