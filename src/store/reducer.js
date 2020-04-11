import * as actionTypes from './actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 4
};

const INGRDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            let ingredients = {
                ...state.ingredients
            };
            ingredients[action.ingredient] = ingredients[action.ingredient] + 1;
            return {
                ...state,
                ingredients,
                totalPrice: state.totalPrice + INGRDIENT_PRICES[action.ingredient]
            };
        case actionTypes.REMOVE_INGREDIENT:
            let ingredientsToRemove = {
                ...state.ingredients
            };
            ingredientsToRemove[action.ingredient] = ingredientsToRemove[action.ingredient] - 1;
            return {
                ...state,
                ingredients: ingredientsToRemove,
                totalPrice: state.totalPrice - INGRDIENT_PRICES[action.ingredient]
            };
        default:
            return state;
    }
};

export default reducer;