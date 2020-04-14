import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';
import { connect } from 'react-redux';

class Checkout extends Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    };

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-details');
    };

    render() {
        let summary = <Redirect to="/" />;
        if (!this.props.purchased) {
            summary = <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler} />
                <Route
                    path={this.props.match.path + '/contact-details'}
                    component={ContactDetails} />
            </div>;
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);