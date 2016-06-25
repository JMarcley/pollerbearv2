var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user');
var secrets = require('../secrets');

module.exports = new FacebookStrategy({
  clientID: secrets.facebook.clientID,
  clientSecret: secrets.facebook.clientSecret,
  callbackURL: secrets.facebook.callbackURL,
  profileFields: ['name', 'email', 'gender', 'locale', 'timezone'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  console.log('=====================================================');
  console.log(req.user);
  console.log('=====================================================');
  console.log(accessToken);
  console.log('=====================================================');
  console.log(refreshToken);
  console.log('=====================================================');
  console.log(profile.id);
  if (req.user) {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, false, { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      } else {
        User.findById(req.user.id, function(err, user) {
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.save(function(err) {
            done(err, user, { msg: 'Facebook account has been linked'});
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          return done(null, false, { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
        } else {
          var user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
          user.profile.name = profile._json.first_name + ' ' + profile._json.last_name;
          user.profile.gender = profile._json.gender;
          user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
});
