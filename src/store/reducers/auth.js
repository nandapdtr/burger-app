import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectTo: '/'
};

const authStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
};

const authSucces = (state, action) => {
    return updateObject(state, {
        loading: false,
        userId: action.authData.localId,
        token: action.authData.idToken,
        error: null
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const tokenExpired = (state) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const setAuthRedirect = (state, action) => {
    return updateObject(state, {
        redirectTo: action.path
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSucces(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.TOKEN_EXPIRED: return tokenExpired(state);
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirect(state, action);
        default: return state;
    }
};

export default reducer;