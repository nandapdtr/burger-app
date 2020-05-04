import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const orderBurgerSuccess = () => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS
    };
};

const orderBurgerFail = () => {
    return {
        type: actionTypes.ORDER_BURGER_FAIL
    };
};

const orderBurgerStart = () => {
    return {
        type: actionTypes.ORDER_BURGER_START
    };
};

export const orderBurgerInit = () => {
    return {
        type: actionTypes.ORDER_BURGER_INIT
    };
};

export const orderBurger = (orderData, token) => {
    return dispatch => {
        dispatch(orderBurgerStart());
        
        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(res => {
                dispatch(orderBurgerSuccess());
            }).catch(err => {
                dispatch(orderBurgerFail());
            });
    };
};

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    };
};

const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        const queryPamars = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`/orders.json${queryPamars}`)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            }).catch(err => {
                dispatch(fetchOrdersFail());
            });
    };
};