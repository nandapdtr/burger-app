import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredient => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient
    };
};

export const removeIngredient = ingredient => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient
    };
};

const getIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.GET_INGREDIENTS_SUCCESS,
        ingredients
    };
};

const getIngredientsFail = (error) => {
    return {
        type: actionTypes.GET_INGREDIENTS_FAIL,
        error
    };
};

const getIngredientsInit = () => {
    return {
        type: actionTypes.GET_INGREDIENTS_INIT
    };
};

export const getIngredients = () => {
    return dispatch => {
        dispatch(getIngredientsInit());
        axios.get('/ingredients.json')
            .then(res => {
                dispatch(getIngredientsSuccess(res.data));
            }).catch(err => {
                dispatch(getIngredientsFail(err));
            });
    };
};