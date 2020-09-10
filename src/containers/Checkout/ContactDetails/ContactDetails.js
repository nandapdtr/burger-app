import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactDetails.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactDetails = props => {
    const [contactForm, setContactForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            validation: {
                required: true
            },
            valid: false,
            value: '',
            touched: false,
            errorMessage: 'Please enter name'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            value: '',
            touched: false,
            errorMessage: 'Please enter email'
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            validation: {
                required: true
            },
            valid: false,
            value: '',
            touched: false,
            errorMessage: 'Please enter street'
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code'
            },
            validation: {
                required: true,
                minLenght: 5,
                maxLenght: 5
            },
            valid: false,
            value: '',
            touched: false,
            errorMessage: 'Please enter valid postal code'
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            validation: {
                required: true
            },
            valid: false,
            value: '',
            touched: false,
            errorMessage: 'Please enter country'
        },
        deliveryType: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fatest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            validation: {},
            value: 'cheapest',
            valid: true
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const submitOrder = (event) => {
        event.preventDefault();
        const contactData = {};
        for (let identifier in contactForm) {
            contactData[identifier] = contactForm[identifier].value;
        }
        const orderData = {
            ingredients: props.ings,
            price: props.totalPrice,
            contactData,
            userId: props.userId
        };

        props.orderBurger(orderData, props.token);
    };

    const inputChangeHandler = (event, identifier) => {
        const contactElement = updateObject(contactForm[identifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, contactForm[identifier].validation)
        });
        const contactDetails = updateObject(contactForm, {
            [identifier]: contactElement
        });
        let isFormValid = true;
        for (let formIdentifier in contactDetails) {
            isFormValid = formIdentifier === identifier ? contactElement.valid && isFormValid : contactDetails[formIdentifier].valid && isFormValid;
        }
        setContactForm(contactDetails);
        setIsFormValid(isFormValid);
    };

    let formElementArray = [];
    for (let element in contactForm) {
        formElementArray.push({
            id: element,
            config: contactForm[element]
        });
    }
    let form = (
        <form>
            {formElementArray.map(el => (
                <Input
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    isValid={el.config.valid}
                    touched={el.config.touched}
                    errorMessage={el.config.errorMessage}
                    changed={(event) => inputChangeHandler(event, el.id)} />
            ))}
            <Button
                btnType="Success"
                disabled={!isFormValid}
                clicked={submitOrder}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactDetails}>
            <h4>Please provide your contact details</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        orderBurger: (orderData, token) => dispatch(actions.orderBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactDetails, axios));