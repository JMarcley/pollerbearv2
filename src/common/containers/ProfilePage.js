import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import * as UserActions from '../actions/user';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Profile.need = [
  UserActions.fetchUserData
]

function mapStateToProps(state) {
  let { user } = state;
  user = user.present;
  const {
    profile
  } = user || {
  };
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
