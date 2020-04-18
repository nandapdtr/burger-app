import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.getIngredients();
    }

    updatePerchasable() {
        const ingredients = this.props.ingredients;
        const sum = Object.keys(ingredients).map(ing => ingredients[ing]).reduce((sum, curr) => sum + curr, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.orderBurgerInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <p>Ingredients can't loading</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.loading) {
            burger = <Spinner />;
        } else if (this.props.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    isAuth={this.props.isAuthenticated}
                    perchasable={this.updatePerchasable()}
                    order={this.purchaseHandler} />
            </Aux>;

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                continue={this.purchaseContinueHandler}
                cancel={this.purchaseCancelHandler}
            ></OrderSummary>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        loading: state.burger.loading,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: ingredient => dispatch(actions.addIngredient(ingredient)),
        removeIngredient: ingredient => dispatch(actions.removeIngredient(ingredient)),
        getIngredients: () => dispatch(actions.getIngredients()),
        orderBurgerInit: () => dispatch(actions.orderBurgerInit()),
        setAuthRedirect: path => dispatch(actions.setAuthRedirect(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));