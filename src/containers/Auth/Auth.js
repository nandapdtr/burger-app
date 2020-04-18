import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLenght: 6
                }
            }
        },
        isSignUp: true
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectTo !== '/') {
            this.props.setAuthRedirect('/');
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = !!value && isValid;
        }
        if (rules.minLenght) {
            isValid = value.length >= rules.minLenght && isValid;
        }
        if (rules.isEmail) {
            const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = regEx.test(value) && isValid;
        }
        if (rules.maxLenght) {
            isValid = value.length <= rules.maxLenght && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        };
        this.setState({ controls: updatedControls });
    };

    authenticate = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    signinSwitchHandler = () => {
        this.setState(prevState => ({
            isSignUp: !prevState.isSignUp
        }));
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementArray.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                isValid={el.config.valid}
                touched={el.config.touched}
                errorMessage={el.config.errorMessage}
                changed={(event) => this.inputChangeHandler(event, el.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error}</p>
        }

        let redirect = null;
        if (this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.authRedirectTo} />
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.authenticate}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.signinSwitchHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    authRedirectTo: state.auth.redirectTo,
    buildingBurger: state.burger.building
});

const mapDispatchToProps = dispatch => ({
    authenticate: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setAuthRedirect: () => dispatch(actions.setAuthRedirect('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);