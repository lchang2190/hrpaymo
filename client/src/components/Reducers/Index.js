import { combineReducers } from 'redux';
import { LOG_USER_OUT, 
         GET_BALANCE,
         GET_USER_INFO,
         LOG_IN,
         GET_FRIENDS_LIST,
         PREPEND_FEED,
         LOAD_MORE_FEED,
         LOAD_PROFILE_DATA,
         UNKNOWN_USER,
         PROFILE_LOAD_MORE_FEED
                } from './actions';
import axios from 'axios';

function paymo(state = {
    isLoggedIn: false,
    globalFeed: {},
    userFeed: {},
    balance: null,
    userInfo: {},
    friends: [],
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
        case PROFILE_LOAD_MORE_FEED:
            console.log('reducer load more feed profile', action.payload)
            return Object.assign({}, state, {
                [action.payload.feedType]: action.payload.obj
            })
        case LOAD_PROFILE_DATA:
            // console.log('loading profile data', action.payload)
            return Object.assign({}, state, {    
                profileInfo: action.payload
            })
        case UNKNOWN_USER:
            // console.log('unknown user reducer', action.payload)
            return Object.assign({}, state, {
                unknownUser: true
            })
        default:
            return state
    }
}

export default paymo