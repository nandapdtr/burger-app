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

export const orderBurger = (orderData) => {
    return dispatch => {
        dispatch(orderBurgerStart());
        axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios.get('/orders.json')
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