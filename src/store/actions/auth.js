import axios from 'axios';
import * as actionTypes from './actionTypes';

const authSuccess = (authData) => ({
    type: actionTypes.AUTH_SUCCESS,
    authData
});

const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const checkTokenExpiry = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    };
};

const logout = () => ({
    type: actionTypes.TOKEN_EXPIRED
});

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwL9wxNx7L_vjqz0eybXkPmcCU7fG6IHQ';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwL9wxNx7L_vjqz0eybXkPmcCU7fG6IHQ';
        }
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post(url, authData)
            .then(respose => {
                dispatch(authSuccess(respose.data));
                dispatch(checkTokenExpiry(respose.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail('Something went wrong'));
            });
    };
};  