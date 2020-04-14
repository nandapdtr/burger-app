import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const fetchOrderSuccess = (state, action) => {
    const updatedState = {
        orders: action.orders,
        loading: false,
        purchased: false
    };
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_BURGER_SUCCESS: return updateObject(state, { loading: false, purchased: true });
        case actionTypes.ORDER_BURGER_FAIL: return updateObject(state, { loading: false });
        case actionTypes.ORDER_BURGER_START: return updateObject(state, { loading: true });
        case actionTypes.ORDER_BURGER_INIT: return updateObject(state, { purchased: false });
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false });
        case actionTypes.FETCH_ORDERS_INIT: return updateObject(state, { loading: true });
        default: return state;
    }
};

export default reducer;