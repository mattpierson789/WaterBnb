import csrfFetch from "./csrf";
import { storeCSRFToken, restoreCSRF } from "./csrf";

export const SET_CURRENT_USER = "session/setCurrentUser";
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
});

const removeCurrentUser = (user) => ({
    type: REMOVE_CURRENT_USER
});

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }

export const login = (user) => async (dispatch) => {

    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            credential,
            password
        })
    });

    const data = await response.json();
    dispatch(setCurrentUser(data.user));
    storeCSRFToken(response);
    return response;

};

export const restoreSession = () => async dispatch => {

    const response = await csrfFetch("/api/session")
    storeCSRFToken(response)
    const data = await response.json();
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return response

  }

  export const signup = (user) => async dispatch => {

    const {username, email, password} = user
    const response = await csrfFetch("api/session", {
        method: "POST",
        body: JSON.stringify({username, email, password})
    })
    const data = await response.json();
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return response;

    }


    export const logout = (user) => async dispatch => {

    const response = await csrfFetch('api/session', {

        method: "DELETE"

    })

    const data = await response.json()
    storeCurrentUser(data.user)
    dispatch(removeCurrentUser(data.user))
    return response;

    }

const initialState = { user: null };

const sessionReducer = (state = { user: null }, action) => {

    switch (action.type) {

        case SET_CURRENT_USER:
            return { ...state, user: action.user };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };
        default:
            return state;

    }

}

export default sessionReducer;

