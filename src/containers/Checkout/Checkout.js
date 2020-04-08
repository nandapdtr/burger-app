import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';


class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    };

    componentWillMount() {
        console.log('componentWillMount');
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let params of query.entries()) {
            if (params[0] === 'price') {
                price = params[1];
            } else {
                ingredients[params[0]] = +params[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            price: price
        });
    }

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
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler} />
                <Route
                    path={this.props.match.path + '/contact-details'}
                    render={(props) => <ContactDetails ingredients={this.state.ingredients} totalPrice={this.state.price} {...props} />} />
            </div>
        );
    }
}

export default Checkout;