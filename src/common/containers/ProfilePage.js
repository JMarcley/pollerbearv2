import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import * as UserActions from '../actions/user';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
// Profile.need = [
//   UserActions.fetchUserData
// ]

// function connectedApps(user) {
//   let apps = {};
//   if (user.tokens.length > 0) {
//     for (var i = 0; i < user.tokens.length; i++) {
//       apps.push(user.tokens[i].[i].kind);
//     }
//   } else {
//     return {};
//   }
//   return apps;
// }

function mapStateToProps(state) {
  // UserActions.getUserData();

  let { user } = state;
  // user = user;

  const profile = {
    name: user.profile.name,
    gender: user.profile.gender,
    location: user.profile.location,
    website: user.profile.website,
    picture: user.profile.picture
  };

  // console.log(profile);

  
  // selectedReddit = selectedReddit.present;
  // postsByReddit = postsByReddit.present;
  // const {
  //   isFetching,
  //   lastUpdated,
  //   error,
  //   items: posts
  // } = postsByReddit[selectedReddit] || {
  //   isFetching: true,
  //   error:{},
  //   items: []
  // };

  return {
    profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
