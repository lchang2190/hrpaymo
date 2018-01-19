import { combineReducers } from 'redux';
import { LOG_USER_OUT, 
         GET_BALANCE,
         GET_USER_INFO,
         LOG_IN,
         GET_FRIENDS_LIST,
         CHANGE_USERNAMES,
         PREPEND_FEED,
         CHANGE_PAYEE_USERNAME,
         PAY_USER,
         NO_PAY_USER,
         HANDLE_PAYMENT_INPUTS,
         LOAD_MORE_FEED,
         LOAD_PROFILE_DATA,
         UNKNOWN_USER
                } from './actions';
import axios from 'axios';

function paymo(state = {
    isLoggedIn: false,
    globalFeed: {},
    userFeed: {},
    balance: null,
    userInfo: {},
    friends: [],
    payeeUsername: '',
    amount: '',
    note: '',
    paymentFail: false,
    usernames: [],
    profileInfo: {},
    unknownUser: false,
    profileFeed: {},
    relationalFeed: {}}, action) {
    // console.log('paymo reducer was called with state', state, 'and action', action)
    switch (action.type) {
        case LOG_USER_OUT:
            return Object.assign({}, state, {
                isLoggedIn: false,
                globalFeed: {},
                userFeed: {},
                balance: null,
                userInfo: {}
            })
        case GET_BALANCE:
            return Object.assign({}, state, { 
                balance: action.payload
            })
        case GET_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.payload
            })
        case LOG_IN: 
           return Object.assign({}, state, {
               isLoggedIn: true,
               userInfo: action.payload
           })
        case GET_FRIENDS_LIST: 
            return Object.assign({}, state, {
                friends: action.payload
            });
        case PREPEND_FEED:
            // console.log('reducer load feed', action.payload)
            return Object.assign({}, state, {
                [action.payload.feedType]: action.payload.obj
            })
        case LOAD_MORE_FEED:
            // console.log('reducer load feed', action.payload)
            return Object.assign({}, state, {
                [action.payload.feedType]: action.payload.obj
            })
        case CHANGE_USERNAMES: 
          return Object.assign({}, state, {
              usernames: action.payload
          })
        case CHANGE_PAYEE_USERNAME: 
          return Object.assign({}, state, {
              payeeUsername: action.payload
          })
        case PAY_USER: 
          return Object.assign({}, state, {
              payeeUsername: '',
              amount: '',
              note: '',
              paymentFail: false
          })
        case NO_PAY_USER: 
          return Object.assign({}, state, {
              paymentFail: true
          })
        case HANDLE_PAYMENT_INPUTS: 
          return Object.assign({}, state, {
              [action.payload.name]: action.payload.value
          })
        case LOAD_PROFILE_DATA:
            // console.log('loading profile data', action.payload)
            return Object.assign({}, state, {    
                profileInfo: action.payload
            })
        case UNKNOWN_USER:
            console.log('unknown user reducer', action.payload)
            return Object.assign({}, state, {
                unknownUser: true
            })
        default:
            return state
    }
}

export default paymo