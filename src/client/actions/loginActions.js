import fetch from 'cross-fetch';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, RELOGIN_REQUEST } from './actionTypes';
import { URL } from '../Constants';
import { cartClear } from './cartActions';


function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}

export function loginError(msg) {
    console.warn("LOGIN_ERROR", msg);
    return {
        type: LOGIN_ERROR,
        payload: msg
    };
}

/* actions with built in dispatch */
export function loginRequest(data) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: data
        });

        fetch(`http://${URL}:8080/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: data.email,
                pass: data.password
            })
        })
        .then(res => {
            if (res.status >= 400) {
                dispatch(loginError("Bad response from server, try again later."));
            }
            else {
                res.json().then(json => {
                    if (!json.token) {
                        dispatch(loginError("Invalid email or password."));
                    }
                    else dispatch(loginSuccess(json.token));
                });
            }
        })
		.catch(error => dispatch(loginError("Wops...")));
    };
}


export function logout(token) {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });

        fetch(`http://${URL}:8080/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token})
        })
        .then(res => {
            if (res.status === 200) {
                dispatch(cartClear());
            }
        });
    }
}

export function ReloginRequest(token) {
    return (dispatch) => {
        dispatch({
            type: RELOGIN_REQUEST,
            payload: token
        });

        fetch(`http://${URL}:8080/reauthenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token})
        })
        .then(res => {
            if (res.status >= 400) {
                dispatch(loginError("Bad response from server, try again later."));
            }
            else {
                res.json().then(json => {
                    if (!json.token) {
                        dispatch(loginError("Invalid old token."));
                    }
                    else dispatch(loginSuccess(json.token));
                });
            }
        })
		.catch(error => dispatch(loginError("Wops...")));
    };
}