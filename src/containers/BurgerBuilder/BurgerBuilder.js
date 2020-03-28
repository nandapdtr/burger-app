import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGRDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        perchasable: false
    };

    updatePerchasable(ingredients) {
        const sum = Object.keys(ingredients).map(ing => ingredients[ing]).reduce((sum, curr) => sum + curr, 0);
        this.setState({ perchasable: sum > 0 });

    }

    addIngredientHandler = (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[ingredient] = updatedCount;
        const priceAddition = INGRDIENT_PRICES[ingredient];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePerchasable(updatedIngredients);
    }

    removeIngredientHandler = (ingredient) => {
        const oldCount = this.state.ingredients[ingredient];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[ingredient] = updatedCount;
        const priceDeduction = INGRDIENT_PRICES[ingredient];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePerchasable(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} 
                    perchasable={this.state.perchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;