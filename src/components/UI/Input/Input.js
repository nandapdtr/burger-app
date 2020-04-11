import React from 'react';
import classes from './Input.module.css';

const input = props => {
    let inputEl = null;
    const inputClasses = [classes.InputElement];
    let errorElement = null;
    if (!props.isValid && props.touched) {
        inputClasses.push(classes.Invalid);
        errorElement = <p className={classes.Error}>{props.errorMessage}</p>;
    }
    switch (props.elementType) {
        case 'input':
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'textarea':
            inputEl = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'select':
            inputEl = <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            break;
        default:
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
    }
    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputEl}
            {errorElement}
        </div>
    );
};

export default input;