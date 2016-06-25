export const GET_USER = 'GET_USER',
  TOGGLE_LOGIN_MODE = 'TOGGLE_LOGIN_MODE',
  MANUAL_LOGIN_USER = 'MANUAL_LOGIN_USER',
  LOGIN_SUCCESS_USER = 'LOGIN_SUCCESS_USER',
  LOGIN_ERROR_USER = 'LOGIN_ERROR_USER',
  SIGNUP_USER = 'SIGNUP_USER',
  SIGNUP_SUCCESS_USER = 'SIGNUP_SUCCESS_USER',
  SIGNUP_ERROR_USER = 'SIGNUP_ERROR_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  LOGOUT_SUCCESS_USER = 'LOGOUT_SUCCESS_USER',
  LOGOUT_ERROR_USER = 'LOGOUT_ERROR_USER',
  GET_USER_DATA = 'GET_USER_DATA',
  GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST',
  GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
  GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE',
  CLEAR_USER_DATA = 'CLEAR_USER_DATA';

// export function getUser(value) {
//   return {
//     type: GET_USER,
//     payload: value
//   };
// }

import { polyfill } from 'es6-promise';
import request from 'axios';
// request.defaults.headers.common['Authorization'] = AUTH_TOKEN;
import { push } from 'react-router-redux';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api = '/login') {
  return request({
    url: api,
    method,
    data,
    withCredentials: true
  });
}


// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

// Sign Up Action Creators
function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

// // fetch user data action creators
// function fetchUserData() {
//   return { type: types.FETCH_USER_DATA };
// }

// function fetchUserDataSuccess(data) {
//   return { type: types.FETCH_USER_DATA_SUCCESS , data };
// }
//
// function fetchUserDataError() {
//   return { type: types.FETCH_USER_DATA_ERROR };
// }

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(err.data.message));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(err.data.message));
      });
  };
}

export function logOut() {
  return dispatch => {
    console.log('dispatched logout');
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

export function fetchUserData () {
  console.log('fetchUserData called');
  return {
    type: GET_USER_DATA,
    // promise:
    //   new Promise (function(resolve, reject) {
    //     console.log('promise called');
    //     resolve( request({url: 'https://localhost:3000/user', method: 'get', withCredentials: true}) )
    //     // resolve( request('https://localhost:3000/user') )
    // })
    promise: makeUserRequest('get', null, 'https://localhost:3000/axios/user')
  };
}


export function clearUserData () {
  return { type: types.CLEAR_USER_DATA }
}
