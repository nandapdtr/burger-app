import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactDetails.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactDetails extends Component {
    state = {
        contactForm: {
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
                    type: 'text',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true
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
        },
        isFormValid: false,
        loading: false
    };

    submitOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const contactData = {};
        for (let identifier in this.state.contactForm) {
            contactData[identifier] = this.state.contactForm[identifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData
        };

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(err => {
                this.setState({ loading: false });
            });
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = !!value && isValid;
        }
        if (rules.minLenght) {
            isValid = value.length >= rules.minLenght && isValid;
        }
        if (rules.maxLenght) {
            isValid = value.length <= rules.maxLenght && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, identifier) => {
        const contactDetails = {
            ...this.state.contactForm
        };
        const contactElement = {
            ...contactDetails[identifier]
        };
        contactElement.value = event.target.value;
        contactElement.touched = true;
        contactElement.valid = this.checkValidity(contactElement.value, contactElement.validation);
        let isFormValid = true;
        for (let formIdentifier in contactDetails) {
            isFormValid = formIdentifier === identifier ? contactElement.valid && isFormValid : contactDetails[formIdentifier].valid && isFormValid;
        }
        contactDetails[identifier] = contactElement;
        this.setState({
            contactForm: contactDetails,
            isFormValid
        });
    };

    render() {
        let formElementArray = [];
        for (let element in this.state.contactForm) {
            formElementArray.push({
                id: element,
                config: this.state.contactForm[element]
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
                        changed={(event) => this.inputChangeHandler(event, el.id)} />
                ))}
                <Button
                    btnType="Success"
                    disabled={!this.state.isFormValid}
                    clicked={this.submitOrder}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactDetails}>
                <h4>Please provide your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactDetails;