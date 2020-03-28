import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = props => {
    let transfromedIngredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])]
                .map((_, i) => {
                    return <BurgerIngredients key={key + i} type={key} />
                })
        })
        .reduce((prev, curr) => {
            return [...prev, ...curr];
        }, []);

    if (transfromedIngredients.length === 0) {
        transfromedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transfromedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;