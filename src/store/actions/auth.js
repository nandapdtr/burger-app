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
    console.log('expiresIn ', expiresIn);
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.TOKEN_EXPIRED
    };
};

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
            .then(response => {
                const expiryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expiryDate);
                dispatch(authSuccess(response.data));
                dispatch(checkTokenExpiry(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail('Something went wrong'));
            });
    };
};

export const setAuthRedirect = path => ({
    type: actionTypes.SET_AUTH_REDIRECT,
    path
});

export const checkAuthStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const userId = localStorage.getItem('userId');
            const expiryDate = new Date(localStorage.getItem('expirationDate'));
            if (expiryDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess({
                    localId: userId,
                    idToken: token
                }));
                dispatch(checkTokenExpiry((expiryDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};