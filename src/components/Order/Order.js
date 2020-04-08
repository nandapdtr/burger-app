import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    let ingredients = Object.keys(props.ingredients).map(igKey => {
        return <span
            key={igKey}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #eee'
            }}
        >{igKey} ({props.ingredients[igKey]})</span>
    });
    return (
        <div className={classes.Order}>
            <p> Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;