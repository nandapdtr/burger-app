import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const ingredients = useSelector(state => state.burger.ingredients);
    const totalPrice = useSelector(state => state.burger.totalPrice);
    const error = useSelector(state => state.burger.error);
    const loading = useSelector(state => state.burger.loading);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();

    const addIngredient = ingredient => dispatch(actions.addIngredient(ingredient));
    const removeIngredient = ingredient => dispatch(actions.removeIngredient(ingredient));
    const getIngredients = useCallback(() => dispatch(actions.getIngredients()), [dispatch]);
    const orderBurgerInit = () => dispatch(actions.orderBurgerInit());
    const setAuthRedirect = path => dispatch(actions.setAuthRedirect(path));

    useEffect(() => {
        getIngredients();
    }, [getIngredients]);

    const updatePerchasable = () => {
        const ings = ingredients;
        const sum = Object.keys(ings).map(ing => ings[ing]).reduce((sum, curr) => sum + curr, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            setAuthRedirect('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        orderBurgerInit();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = error ? <p>Ingredients can't loading</p> : <Spinner />;
    let orderSummary = null;
    if (loading) {
        burger = <Spinner />;
    } else if (ingredients) {
        burger = <Aux>
            <Burger ingredients={ingredients}></Burger>
            <BuildControls
                ingredientAdded={addIngredient}
                ingredientRemoved={removeIngredient}
                disabled={disabledInfo}
                price={totalPrice}
                isAuth={isAuthenticated}
                perchasable={updatePerchasable()}
                order={purchaseHandler} />
        </Aux>;

        orderSummary = <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            continue={purchaseContinueHandler}
            cancel={purchaseCancelHandler}
        ></OrderSummary>;
    }

    return (
        <Aux>
            <Modal show={purchasing} closeModal={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}
// const mapStateToProps = state => {
//     return {
//         ingredients: state.burger.ingredients,
//         totalPrice: state.burger.totalPrice,
//         error: state.burger.error,
//         loading: state.burger.loading,
//         isAuthenticated: state.auth.token !== null
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         addIngredient: ingredient => dispatch(actions.addIngredient(ingredient)),
//         removeIngredient: ingredient => dispatch(actions.removeIngredient(ingredient)),
//         getIngredients: () => dispatch(actions.getIngredients()),
//         orderBurgerInit: () => dispatch(actions.orderBurgerInit()),
//         setAuthRedirect: path => dispatch(actions.setAuthRedirect(path))
//     };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
export default withErrorHandler(BurgerBuilder, axios);