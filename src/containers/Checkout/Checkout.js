import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';
import { connect } from 'react-redux';


class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    };

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    };

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-details');
    };

    render() {
        console.log('render');
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler} />
                <Route
                    path={this.props.match.path + '/contact-details'}
                    component={ContactDetails} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
}

export default connect(mapStateToProps)(Checkout);