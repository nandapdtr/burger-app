import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
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
    });

    const [isSignUp, setIsSignUp] = useState(true);
    const { setAuthRedirect, buildingBurger, authRedirectTo } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectTo !== '/') {
            setAuthRedirect('/');
        }
    }, [setAuthRedirect, buildingBurger, authRedirectTo]);

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, controls[controlName].validation)
            })
        });
        setControls(updatedControls);
    };

    const authenticate = (event) => {
        event.preventDefault();
        props.authenticate(controls.email.value, controls.password.value, isSignUp);
    };

    const signinSwitchHandler = () => {
        setIsSignUp(!isSignUp);
    };

    const formElementArray = [];
    for (let key in controls) {
        formElementArray.push({
            id: key,
            config: controls[key]
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
            changed={(event) => inputChangeHandler(event, el.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = <p>{props.error}</p>
    }

    let redirect = null;
    if (props.isAuthenticated) {
        redirect = <Redirect to={props.authRedirectTo} />
    }

    return (
        <div className={classes.Auth}>
            {redirect}
            {errorMessage}
            <form onSubmit={authenticate}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                clicked={signinSwitchHandler}
                btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
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