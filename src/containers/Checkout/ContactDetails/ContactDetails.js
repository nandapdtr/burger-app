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
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            deliveryType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fatest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    submitOrder = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Nanda Kumar',
                email: 'test@test.com',
                phone: '123456789',
                address: {
                    street: 'Teststreet 2',
                    city: 'Testcity',
                    country: 'Netherlands',
                    postalCode: '123456'
                }
            },
            deliveryType: 'superfast'
        };

        axios.post('/orders.json', order)
            .then(res => {
                console.log('res ', res);
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(err => {
                console.log('error ', err);
                this.setState({ loading: false });
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
                        value={el.config.value} />
                ))}
                <Button btnType="Success" clicked={this.submitOrder}>ORDER</Button>
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