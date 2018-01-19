

export const LOG_USER_OUT = 'LOG_USER_OUT';
export const GET_BALANCE = 'GET_BALANCE';
export const GET_USER_INFO = 'GET_USER_INFO';
export const LOG_IN = 'LOG_IN';
export const PREPEND_FEED = 'PREPEND_FEED';
export const LOAD_MORE_FEED = 'LOAD_MORE_FEED';
export const LOAD_PROFILE_DATA = 'LOAD_PROFILE_DATA';
export const UNKNOWN_USER = 'UNKNOWN_USER';


// /*
//  * action creators
//  */

// export function addTodo(text) {
//   return { type: ADD_TODO,
// text: text    
// }
// }

export function actionLogOut() {
    return { type: LOG_USER_OUT }
}

export function actionBalance(request) {
		return { type: GET_BALANCE,
						 payload: request
					 }
}

export function actionUserInfo(request) {
		return {	type: GET_USER_INFO,
							payload: request
						}
}
export function actionLogIn(request) {
	// const result = await request;
	return {
		type: LOG_IN,
		payload: request
	}
}

export function getFriends(request) {
	return {
		type: GET_FRIENDS_LIST,
		payload: request
	}
}

export function actionPrependFeed(request) {
	// console.log('action creator feed', request);
	return {
		type: PREPEND_FEED,
		payload: request
	}
}

export function actionLoadMoreFeed(request) {
	// console.log('action load feed creator', request);
	return {
		type: LOAD_MORE_FEED,
		payload: request
	}
}

export function actionLoadProfileData(request) {
	// console.log('action load profile', request);
	return {
		type: LOAD_PROFILE_DATA,
		payload: request
	}
}

export function actionUnknownUser() {
	console.log('action load unknown user', request);
		return {
			type: UNKNOWN_USER,
			// paylod: request
		}
}



