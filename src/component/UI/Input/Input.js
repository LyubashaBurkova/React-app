import React from 'react';
import classes from './Input.module.css';

const Input = props => {

    function isInvalid({valid, touched, sholdValidate}) {
        return !valid && sholdValidate && touched
    }

    const cls = [
        classes.Input
    ];

    const inputType = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor="">{props.label}</label>
            <input 
                type={props.type}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalid(props) 
            ? <span>{props.errorMessage || 'Введите верное значение'}</span>
            : null
            }
            
        </div>
    )
}

export default Input;