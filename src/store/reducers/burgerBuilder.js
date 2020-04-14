import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    loading: false
};

const INGRDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGRDIENT_PRICES[action.ingredient]

    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGRDIENT_PRICES[action.ingredient]

    };
    return updateObject(state, updatedState);
};

const getIngredientsSuccess = (state, action) => {
    const totalPrice = 4 + Object.keys(action.ingredients)
        .map(ing => action.ingredients[ing] * INGRDIENT_PRICES[ing])
        .reduce((prev, curr) => prev + curr, 0);
    const updatedState = {
        ingredients: action.ingredients,
        totalPrice,
        error: false,
        loading: false
    };
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.GET_INGREDIENTS_SUCCESS: return getIngredientsSuccess(state, action);
        case actionTypes.GET_INGREDIENTS_FAIL: return updateObject(state, { error: action.error, loading: true });
        case actionTypes.GET_INGREDIENTS_INIT: return updateObject(state, { loading: true });
        default: return state;
    }
};

export default reducer;