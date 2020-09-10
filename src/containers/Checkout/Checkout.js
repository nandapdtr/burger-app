import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';
import { connect } from 'react-redux';

const Checkout = props => {

    const cancelCheckoutHandler = () => {
        props.history.goBack();
    };

    const continueCheckoutHandler = () => {
        props.history.replace('/checkout/contact-details');
    };

    let summary = <Redirect to="/" />;
    if (!props.purchased) {
        summary = <div>
            <CheckoutSummary
                ingredients={props.ings}
                cancelCheckout={cancelCheckoutHandler}
                continueCheckout={continueCheckoutHandler} />
            <Route
                path={props.match.path + '/contact-details'}
                component={ContactDetails} />
        </div>;
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);