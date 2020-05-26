import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem = props => {
    return (
        <li class={classes.AnswerItem}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem;
