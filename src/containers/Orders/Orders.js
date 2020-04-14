import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orders = null;
        if (this.props.loading) {
            orders = <Spinner />
        } else if (this.props.orders.length > 0) {
            orders = this.props.orders.map(order => {
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
}

const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Orders, axios));