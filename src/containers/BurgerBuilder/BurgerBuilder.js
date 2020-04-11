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
import * as actionTypes from '../../store/actionTypes';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // console.log(this.props);
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data });
        //     }).catch(err => {
        //         console.log('error');
        //         this.setState({ error: true });
        //     });
    }

    updatePerchasable() {
        const ingredients = this.props.ingredients;
        const sum = Object.keys(ingredients).map(ing => ingredients[ing]).reduce((sum, curr) => sum + curr, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients can't loading</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
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

        if (this.state.loading) {
            orderSummary = <Spinner />;
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: ingredient => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient }),
        removeIngredient: ingredient => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));