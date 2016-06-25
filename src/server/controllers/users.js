var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');

/**
 * POST /login
 */
exports.postLogin = function(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
     return res.status(401).json({ message: info.message});
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return res.status(401).json({message: err});
      return res.status(200).json(
        {
          message: 'You have been successfully logged in.'
        });
    });
  })(req, res, next);
};


/**
 * POST /logout
 */
exports.postLogout = function(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = function(req, res, next) {
  var user =  new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!'});
    }
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return res.status(401).json({message: err});
        return res.status(200).json(
          {
            message: 'You have been successfully logged in.'
          });
      });
    });
  });
};

/**
 * GET /user
 * fetch user profile data
 */
exports.getUserInfo = function(req, res, next) {
  console.log("/user route fired");
  console.log(req.user);

  User.findById(req.user._id, function(err, user) {
    var unsecureUserData = {
      email: user.email,
      userName: user.profile.name,
      picture: user.profile.picture,
      id: user._id
    }
    if (!err) {
      // send non-secure user data
      console.log(unsecureUserData);
      res.status(200).json({
        email: user.email,
        userName: user.profile.name,
        picture: user.profile.picture,
        id: user._id
      });
      // console.log(res);
    } else {
      console.log("error in query for user _ID");
    }
  });
};