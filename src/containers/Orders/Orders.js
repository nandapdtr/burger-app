import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Orders = props => {

    const { fetchOrders, token, userId } = props;

    useEffect(() => {
        fetchOrders(token, userId);
    }, [fetchOrders, token, userId]);

    let orders = null;
    if (props.loading) {
        orders = <Spinner />
    } else if (props.orders.length > 0) {
        orders = props.orders.map(order => {
            return <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        });
    }
    return (
        <div>
            {orders}
        </div>
    );
}

const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Orders, axios));