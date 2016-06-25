import {
  TOGGLE_LOGIN_MODE,
  MANUAL_LOGIN_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_ERROR_USER,
  SIGNUP_USER,
  SIGNUP_SUCCESS_USER,
  SIGNUP_ERROR_USER,
  LOGOUT_USER,
  LOGOUT_SUCCESS_USER,
  LOGOUT_ERROR_USER,
  GET_USER_DATA,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  CLEAR_USER_DATA  } from '../actions/user';

// export default function user(state = {
//   isAuthenticated: false,
//   isLogin: false,
//   isWaiting: false,
//   profile: {},
//   message: ''
// }, action) {
//   switch (action.type) {
//   case GET_USER:
//     return state;
//   default:
//     return state;
//   }
// }

export default function user(state = {
  isLogin: true,
  message: '',
  isWaiting: false,
  isAuthenticated: false,
  profile: {} }, action = {}) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODE:
      return Object.assign({}, state, {
        isLogin: !state.isLogin,
        message: ''
      });
    case MANUAL_LOGIN_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        message: ''
      });
    case LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case SIGNUP_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case SIGNUP_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case SIGNUP_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case LOGOUT_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        isLogin: true
      });
    case GET_USER_DATA:
      return Object.assign({}, state, {
        profiile: action.req.data,
        message: ''
      });
    case GET_USER_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        profile: action.req.data
      });
    case GET_USER_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case CLEAR_USER_DATA:
      return Object.assign({}, state, {
        profile: {}
      });
    default:
      return state;
  }
}
