// import csrfFetch, { storeCSRFToken, restoreCSRF } from "./csrf";

// export const SET_CURRENT_USER = "session/setCurrentUser";
// export const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

// const setCurrentUser = (user) => ({
//     type: SET_CURRENT_USER,
//     user
// });

// const removeCurrentUser = (user) => ({
//     type: REMOVE_CURRENT_USER
// });

// const storeCurrentUser = user => {
//     if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
//     else sessionStorage.removeItem("currentUser");
//   }

// export const login = (user) => async (dispatch) => {

//     const { credential, password } = user;
//     const response = await csrfFetch("/api/session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             credential,
//             password
//         })
//     });

//     const data = await response.json();
//     dispatch(setCurrentUser(data.user));
//     storeCSRFToken(response);
//     return response;

// };

// export const restoreSession = () => async dispatch => {

//     const response = await csrfFetch("/api/session")
//     storeCSRFToken(response)
//     const data = await response.json();
//     storeCurrentUser(data.user)
//     dispatch(setCurrentUser(data.user))
//     return response

//   }

//   export const signup = (user) => async dispatch => {

//     const {username, email, password} = user
//     const response = await csrfFetch("api/users", {
//         method: "POST",
//         body: JSON.stringify({username, email, password})
//     })
//     const data = await response.json();
//     storeCurrentUser(data.user)
//     dispatch(setCurrentUser(data.user))
//     return response;

//     }


//     export const logout = (user) => async dispatch => {

//     const response = await csrfFetch('/api/session', {

//         method: "DELETE"

//     })

//     const data = await response.json()
//     storeCurrentUser(data.user)
//     dispatch(removeCurrentUser(data.user))
//     return response;

//     }

// const initialState = { user: null };

// const sessionReducer = (state = { user: null }, action) => {

//     switch (action.type) {

//         case SET_CURRENT_USER:
//             return { ...state, user: action.user };
//         case REMOVE_CURRENT_USER:
//             return { ...state, user: null };
//         default:
//             return state;

//     }

// }

// export default sessionReducer;
// export {setCurrentUser}

import csrfFetch from "./csrf"


// ACTION TYPE CONSTANTS
export const SET_CURRENT_USER = "session/setCurrentUser"
export const REMOVE_CURRENT_USER = "session/removeCurrentUser"

// REDUX ACTION CREATORS
export const setSession = (user) => ({
	type: SET_CURRENT_USER,
	user
})

export const removeSession = () => ({
	type: REMOVE_CURRENT_USER
})

// REDUX THUNK ACTION CREATORS
export const loginUser = (user) => async dispatch => {
	const {credential, password} = user;
	const res = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({credential, password})
	})
	if(res.ok){
		// Currently, backend app/views/api/users/show.json.jbuilder returns a { user: { id, email, username, etc } }
		// Need to grab the actual user from within the `user` key of the returned response body, we call `data`
		const data = await res.json();

		// RETAIN SESSION USER INFO ACROSS REFRESHES!!!
		storeCurrentUser(data.user)
		dispatch(setSession(data.user))
	}
	return res;
}

export const signupUser = (user) => async dispatch => {
	const {firstName, lastName, birthDate, email, password} = user;
	const res = await csrfFetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({firstName, lastName, birthDate, email, password})
	})
	if(res.ok){
		const data = await res.json();

		// RETAIN SESSION USER INFO ACROSS REFRESHES!!!
		storeCurrentUser(data.user)
		dispatch(setSession(data.user))
	}
	return res;

}

export const logoutUser = () => async dispatch => {
	const res = await csrfFetch('/api/session', {
		method: 'DELETE'
	})
	if(res.ok) {
		storeCurrentUser(null)
		// dispatch(clearAllReservations())
		dispatch(removeSession())
	}
	return res;
}

export const restoreSession = () => async dispatch => {
	// First we make a DB call to check if anyone logged in on backend side.
	const res = await csrfFetch('/api/session');
	// We storeSCRFToken regardless of whether someone logged in on the back.
	storeCSRFToken(res);
	// Parse the API response body into POJO from JSON
	const data = await res.json();
	storeCurrentUser(data.user);
	// Here is the magic where we restore the current user to app's session slice of state.
	dispatch(setSession(data.user));
	// return res;
}

// RETAIN SESSION USER INFO ACROSS REFRESHES!!!
const storeCurrentUser = (user) => {
	// check null first
	if(user){ 
		const stringifiedUser = JSON.stringify(user);
		sessionStorage.setItem("currentUser", stringifiedUser);
	} else {
		sessionStorage.removeItem("currentUser");
	}
}

export const storeCSRFToken = (response) => {
	const csrfToken = response.headers.get("X-CSRF-Token");
	// `if` required: if csrfToken is null, sessionStorage.setItem will coerce that into string "null", whose truthiness is `true`.
	// Btw: to set a key in sessionStorage to `null`, do `sessionStorage.removeItem("headerName")`
	if(csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

// Session Reducer
// How session slice of state's :user gets restored to a currentUser from sessionStorage, if any.
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const sessionReducer = (state = { user: currentUser }, action) => {
	Object.freeze(state)
	const nextState = {...state}
	switch (action.type) {
		case SET_CURRENT_USER:
			return {...nextState, user: action.user};
		case REMOVE_CURRENT_USER:
			return {...nextState, user: null };
		default:
			return state;
	}
}

export default sessionReducer;

